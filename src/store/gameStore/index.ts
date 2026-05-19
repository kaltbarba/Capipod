import { create } from "zustand";

import { logEntry } from "../../utils";

import boardStore from "../boardStore";
import logStore from "../logStore";

import { TurnStage, type Player } from "../../types";

interface GameState {
  currentPlayerIndex: number;
  nextPlayer: (index: number) => void; // [REFACTOR]: TO BE MOVED(?)
  stage: TurnStage;
  setStage: (stage: TurnStage) => void;
  finish: ({ winner }: { winner: Player }) => void;
  podsRevealed: boolean;
  revealPods: () => void;
  winner?: Player;
}

const useGameStore = create<GameState>((set) => ({
  currentPlayerIndex: 0,
  stage: TurnStage.start,
  setStage: (stage) => set({ stage }),
  nextPlayer: (totalPlayers) =>
    set((state) => ({
      currentPlayerIndex: (state.currentPlayerIndex + 1) % totalPlayers,
    })),
  finish: ({ winner }) => {
    set({
      stage: TurnStage.end,
    });
    set({ podsRevealed: true, winner });
    boardStore.getState().disableAllPods();
  },
  podsRevealed: false,
  revealPods() {
    logStore.getState().addLog(logEntry.allPodsRevealed());
    set({ podsRevealed: true });
  },
}));

export default useGameStore;
