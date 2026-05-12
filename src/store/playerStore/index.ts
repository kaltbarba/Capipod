import { create } from "zustand";

import logStore from "../logStore";
import boardStore from "../boardStore";
import gameStore from "../gameStore";

import { Direction, TurnStage, type Coordinate } from "../../types";
import type { Player } from "../../classes";
import LogEntry from "../../classes/LogEntry";

interface PlayerState {
  rollDieForPlayer: (player: Player) => void;
  movePlayer: (player: Player, direction: Direction) => void;
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

const usePlayersStore = create<PlayerState>(() => ({
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
    if (!isMovingAllowed({ player, nextCoordinate })) return;

    const boardState = boardStore.getState();
    const logState = logStore.getState();
    const gameState = gameStore.getState();

    const nextCoordinatePod = boardState.podsMap.get(
      `${nextCoordinate.x},${nextCoordinate.y}`,
    );

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

    if (nextCoordinatePod) {
      player.registerPodDamage(nextCoordinatePod);

      logState.addLog(
        LogEntry.podActivated(player.name, nextCoordinatePod.name),
      );

      logState.addLog(
        LogEntry.podDamagedPlayer({
          playerName: player.name,
          podDamage: nextCoordinatePod.damage,
          podName: nextCoordinatePod.name,
        }),
      );
    }

    boardState.setPlayers([...boardState.players]);

    console.log({ boardState, player });
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
