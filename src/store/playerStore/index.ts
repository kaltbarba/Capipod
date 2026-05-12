import { create } from "zustand";

import logStore from "../logStore";
import boardStore from "../boardStore";
import gameStore from "../gameStore";

import { Direction, TurnStage } from "../../types";
import type { Player } from "../../classes";
import LogEntry from "../../classes/LogEntry";

interface PlayerState {
  rollDieForPlayer: (player: Player) => void;
  movePlayer: (player: Player, direction: Direction) => void;
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
    const boardState = boardStore.getState();
    const logState = logStore.getState();
    const gameState = gameStore.getState();

    const nextCoordinate = player.nextCoordinate(direction);

    if (!player.stepsRemaining) return;
    if (gameState.stage !== TurnStage.moving) return;
    if (boardState.buildingsMap.has(`${nextCoordinate.x},${nextCoordinate.y}`))
      return;
    if (
      nextCoordinate.x < 0 ||
      nextCoordinate.y < 0 ||
      nextCoordinate.x >= boardState.size ||
      nextCoordinate.y >= boardState.size
    )
      return;

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

    if (!player.stepsRemaining) {
      gameState.nextTurn();
    }
  },
}));

export default usePlayersStore;
