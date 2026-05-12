import { create } from "zustand";
import useLogStore from "../logStore";

import { Direction } from "../../types";
import type { Player } from "../../classes";
import LogEntry from "../../classes/LogEntry";

interface PlayerState {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  rollDieForPlayer: (player: Player) => void;
  movePlayer: (player: Player, direction: Direction) => void;
}

const usePlayersStore = create<PlayerState>((set, get) => ({
  players: [],
  setPlayers: (players) => set({ players }),

  rollDieForPlayer: (player) => {
    player.rollDie();
    set({ players: [...get().players] });

    useLogStore.getState().addLog(
      LogEntry.playerRolledDie({
        playerName: player.name,
        dieValue: player.die,
      }),
    );
  },

  movePlayer: (player, direction) => {
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

    useLogStore.getState().addLog(
      LogEntry.playerMoved({
        playerName: player.name,
        coordinate: player.coordinate,
        direction,
      }),
    );
    set({ players: [...get().players] });
  },
}));

export default usePlayersStore;
