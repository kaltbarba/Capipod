import { create } from "zustand";
import type { Player, Pod, Building } from "../classes";
import type { Direction } from "../types";

interface GameState {
  pods: Pod[];
  setPods: (pods: Pod[]) => void;

  buildings: Building[];
  setBuildings: (buildings: Building[]) => void;
}

interface PlayerState {
  players: Player[];
  setPlayers: (players: Player[]) => void;
  rollDieForPlayer: (player: Player) => void;
  movePlayer: (player: Player, direction: Direction) => void;
}

const usePlayersStore = create<PlayerState>((set, get) => ({
  players: [],

  setPlayers: (players: Player[]) => set({ players }),

  rollDieForPlayer: (player: Player) => {
    player.rollDie();
    set({ players: [...get().players] });
  },

  movePlayer: (player: Player, direction: Direction) => {
    switch (direction) {
      case "up":
        console.log("move up");
        player.moveUp();
        break;
      case "down":
        player.moveDown();
        break;
      case "left":
        player.moveLeft();
        break;
      case "right":
        player.moveRight();
        break;
    }

    set({ players: [...get().players] });
  },
}));

const useGameStore = create<GameState>((set) => ({
  pods: [],
  setPods: (pods: Pod[]) => set({ pods }),

  buildings: [],
  setBuildings: (buildings: Building[]) => set({ buildings }),
}));

export { useGameStore, usePlayersStore };
