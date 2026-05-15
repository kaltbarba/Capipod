import { create } from "zustand";

import logStore from "../logStore";
import boardStore from "../boardStore";
import gameStore from "../gameStore";

import { getCoordinateKey, getNextCoordinate, logEntry } from "../../utils";

import {
  Direction,
  TurnStage,
  EffectType,
  Trigger,
  PodState,
  type Coordinate,
  type CoordinateKey,
  type Player,
  type GameItem,
  type EffectHandler,
  type EffectContext,
  type EffectResult,
} from "../../types";

type ConsumeItemParams = {
  player: Player;
  item: GameItem;
  direction?: Direction;
  coordinate?: Coordinate;
};

interface PlayerState {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  playersMap: Map<CoordinateKey, Player>;

  rollDieForPlayer: (player: Player) => void;
  movePlayer: (player: Player, direction: Direction) => void;
  consumeItem: (params: ConsumeItemParams) => void;

  selectedItem: GameItem | null;
  setSelectedItem: (item: GameItem | null) => void;

  finishPlayerTurn: (player: Player) => void;
}

function isMovingAllowed({
  player,
  nextCoordinate,
}: {
  player: Player;
  nextCoordinate: Coordinate;
}): boolean {
  const gameState = gameStore.getState();
  const boardState = boardStore.getState();

  if (!player.stepsRemaining) return false;
  if (gameState.stage !== TurnStage.moving) return false;
  if (boardState.buildingsMap.has(getCoordinateKey(nextCoordinate)))
    return false;
  if (
    nextCoordinate.x < 0 ||
    nextCoordinate.y < 0 ||
    nextCoordinate.x >= boardState.size ||
    nextCoordinate.y >= boardState.size
  )
    return false;

  return true;
}

const effectHandler: EffectHandler = {
  [EffectType.heal]: ({ player, effect }) => {
    return {
      playerUpdate: { healthPoints: player.healthPoints + effect.amount },
      log: logEntry.playerHealed({
        amount: effect.amount,
        playerName: player.name,
      }),
    };
  },
  [EffectType.activatePod]: ({ coordinate }) => {
    if (!coordinate) return {};

    return { boardUpdate: { activatePod: getCoordinateKey(coordinate) } };
  },
};

function replacePlayer(players: Player[], updatedPlayer: Player): Player[] {
  return players.map((p) => (p.id === updatedPlayer.id ? updatedPlayer : p));
}

const usePlayersStore = create<PlayerState>((set, get) => ({
  players: [],
  playersMap: new Map(),
  setPlayers: (players) => {
    const playersMap = new Map<CoordinateKey, Player>(
      players.map((player) => [getCoordinateKey(player.coordinate), player]),
    );
    set({ players, playersMap });
  },

  consumeItem: ({ player, item, direction, coordinate }) => {
    const handler = effectHandler[item.effect.type] as (
      ctx: EffectContext,
    ) => EffectResult;
    const effectResult = handler({
      effect: item.effect,
      player,
      direction,
      coordinate,
    });

    const updatedPlayer: Player = {
      ...player,
      ...effectResult.playerUpdate,
      inventory: player.inventory.filter((i) => i.id !== item.id),
    };

    if (effectResult.log) logStore.getState().addLog(effectResult.log);

    if (effectResult.boardUpdate?.activatePod) {
      const boardState = boardStore.getState();
      const pod = boardState.podsMap.get(effectResult.boardUpdate.activatePod);
      if (pod) {
        boardState.activatePod(effectResult.boardUpdate.activatePod);
        logStore
          .getState()
          .addLog(logEntry.podActivated(player.name, pod.name));
      }
    }

    // gotta use get().setplayers instead of set(players) directly cuz there the map gets updated and my components are consuming it
    get().setPlayers(replacePlayer(get().players, updatedPlayer));
    set({ selectedItem: null });
  },

  rollDieForPlayer: (player) => {
    const die = Math.floor(Math.random() * 6) + 1;
    const updatedPlayer: Player = { ...player, die, stepsRemaining: die };

    get().setPlayers(replacePlayer(get().players, updatedPlayer));
    gameStore.getState().setStage(TurnStage.moving);
    logStore
      .getState()
      .addLog(
        logEntry.playerRolledDie({ playerName: player.name, dieValue: die }),
      );
  },

  movePlayer: (player, direction) => {
    const nextCoordinate = getNextCoordinate(player.coordinate, direction);
    const nextCoordinateKey = getCoordinateKey(nextCoordinate);

    if (!isMovingAllowed({ player, nextCoordinate })) return;

    const boardState = boardStore.getState();
    const logState = logStore.getState();
    const gameState = gameStore.getState();

    let updatedPlayer: Player = {
      ...player,
      coordinate: nextCoordinate,
      stepsRemaining: player.stepsRemaining - 1,
    };

    logState.addLog(
      logEntry.playerMoved({
        playerName: player.name,
        coordinate: nextCoordinate,
        direction,
      }),
    );

    const podAtCoordinate = boardState.podsMap.get(nextCoordinateKey);
    if (podAtCoordinate && podAtCoordinate.state !== PodState.disabled) {
      if (podAtCoordinate.state === PodState.idle) {
        boardState.activatePod(nextCoordinateKey);
      }
      updatedPlayer = {
        ...updatedPlayer,
        healthPoints: updatedPlayer.healthPoints - podAtCoordinate.damage,
      };
      logState.addLog(logEntry.podActivated(player.name, podAtCoordinate.name));
      logState.addLog(
        logEntry.podDamagedPlayer({
          playerName: player.name,
          podDamage: podAtCoordinate.damage,
          podName: podAtCoordinate.name,
        }),
      );
    }

    const itemAtCoordinate = boardState.itemsMap.get(nextCoordinateKey);

    if (itemAtCoordinate) {
      switch (itemAtCoordinate.trigger) {
        case Trigger.pickup:
          updatedPlayer = {
            ...updatedPlayer,
            inventory: [...updatedPlayer.inventory, itemAtCoordinate],
          };
          logState.addLog(
            logEntry.itemPickedUp({
              playerName: player.name,
              itemName: itemAtCoordinate.name,
            }),
          );
          boardState.removeItem(getCoordinateKey(itemAtCoordinate.coordinate));
          break;
        default:
          break;
      }
    }

    get().setPlayers(replacePlayer(get().players, updatedPlayer));

    if (
      boardState.shelterCoordinate.x === nextCoordinate.x &&
      boardState.shelterCoordinate.y === nextCoordinate.y
    ) {
      gameState.finish();
      logState.addLog(
        logEntry.playerReachedShelter({ playerName: player.name }),
      );
      return;
    }
  },
  selectedItem: null,
  setSelectedItem: (selectedItem) => {
    set({ selectedItem });
  },
  finishPlayerTurn(player) {
    boardStore.getState().tickPods();
    gameStore.getState().setStage(TurnStage.start);

    const updatedPlayer: Player = { ...player, die: 0, stepsRemaining: 0 };
    set((state) => ({
      players: replacePlayer(state.players, updatedPlayer),
    }));

    gameStore.getState().nextPlayer(get().players.length);
  },
}));

export default usePlayersStore;
