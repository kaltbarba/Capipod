import { create } from "zustand";

import logStore from "../logStore";
import boardStore from "../boardStore";
import gameStore from "../gameStore";

import {
  Direction,
  TurnStage,
  type Coordinate,
  type Effect,
  EffectType,
  Trigger,
} from "../../types";
import type { Player, GameItem } from "../../classes";
import LogEntry from "../../classes/LogEntry";

type ConsumeItemParams = {
  player: Player;
  item: GameItem;
  direction?: Direction;
};

interface PlayerState {
  rollDieForPlayer: (player: Player) => void;
  movePlayer: (player: Player, direction: Direction) => void;
  consumeItem: (params: ConsumeItemParams) => void;
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
  if (boardState.buildingsMap.has(`${nextCoordinate.x},${nextCoordinate.y}`))
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

function applyItemEffect({
  effect,
  player,
}: {
  effect: Effect;
  player: Player;
}): void {
  switch (effect.type) {
    case EffectType.heal:
      player.heal(effect.amount);
      logStore.getState().addLog(
        LogEntry.playerHealed({
          amount: effect.amount,
          playerName: player.name,
        }),
      );
      break;
    default:
      break;
  }
}

const usePlayersStore = create<PlayerState>(() => ({
  consumeItem: (params) => {
    console.log("consumiinnnng", params);
    const boardState = boardStore.getState();
    const { player, item } = params;

    applyItemEffect({ player, effect: item.effect });
    player.removeFromInventory(item);
    boardState.setPlayers([...boardState.players]);
  },

  rollDieForPlayer: (player) => {
    player.rollDie();
    boardStore.getState().setPlayers([...boardStore.getState().players]);
    gameStore.getState().setStage(TurnStage.moving);
    logStore.getState().addLog(
      LogEntry.playerRolledDie({
        playerName: player.name,
        dieValue: player.die,
      }),
    );
  },

  movePlayer: (player, direction) => {
    const nextCoordinate = player.nextCoordinate(direction);

    // validate movement
    if (!isMovingAllowed({ player, nextCoordinate })) return;

    // MOVEMENT LOGIC TO NEXT COORDINATE
    const boardState = boardStore.getState();
    const logState = logStore.getState();
    const gameState = gameStore.getState();

    switch (direction) {
      case Direction.up:
        player.moveUp();
        break;
      case Direction.down:
        player.moveDown();
        break;
      case Direction.left:
        player.moveLeft();
        break;
      case Direction.right:
        player.moveRight();
        break;
    }

    logState.addLog(
      LogEntry.playerMoved({
        playerName: player.name,
        coordinate: player.coordinate,
        direction,
      }),
    );

    // VERIFIES PODS ON NEW LOCATION = current player location after moving them
    const podAtCoordinate = boardState.podsMap.get(
      `${player.coordinate.x},${player.coordinate.y}`,
    );

    if (podAtCoordinate) {
      player.registerPodDamage(podAtCoordinate);

      logState.addLog(LogEntry.podActivated(player.name, podAtCoordinate.name));

      logState.addLog(
        LogEntry.podDamagedPlayer({
          playerName: player.name,
          podDamage: podAtCoordinate.damage,
          podName: podAtCoordinate.name,
        }),
      );
    }

    // VERIFIERS ITEM ON NEW LOCATION
    const itemAtCoordinate = boardState.itemsMap.get(
      `${player.coordinate.x},${player.coordinate.y}`,
    );

    if (itemAtCoordinate) {
      switch (itemAtCoordinate.trigger) {
        case Trigger.pickup:
          player.addToInventory(itemAtCoordinate);
          logState.addLog(
            LogEntry.itemPickedUp({
              playerName: player.name,
              itemName: itemAtCoordinate.name,
            }),
          );
          boardState.removeItem(
            `${itemAtCoordinate.coordinate.x},${itemAtCoordinate.coordinate.y}`,
          );
          break;
        default:
          break;
      }
    }

    boardState.setPlayers([...boardState.players]);

    if (
      boardState.shelterCoordinate.x === player.coordinate.x &&
      boardState.shelterCoordinate.y === player.coordinate.y
    ) {
      gameState.finish();
      logState.addLog(
        LogEntry.playerReachedShelter({ playerName: player.name }),
      );
      return;
    }

    if (!player.stepsRemaining) {
      gameState.nextTurn();
    }
  },
}));

export default usePlayersStore;
