import { create } from "zustand";

import { logEntry } from "../../utils";

import boardStore from "../boardStore";
import logStore from "../logStore";

import { TurnStage } from "../../types";

interface GameState {
  currentPlayerIndex: number;
  nextPlayer: (index: number) => void; // [REFACTOR]: TO BE MOVED(?)
  stage: TurnStage;
  setStage: (stage: TurnStage) => void;
  finish: () => void;
  podsRevealed: boolean;
  revealPods: () => void;
}

const useGameStore = create<GameState>((set) => ({
  currentPlayerIndex: 0,
  stage: TurnStage.start,
  setStage: (stage) => set({ stage }),
  nextPlayer: (totalPlayers) =>
    set((state) => ({
      currentPlayerIndex: (state.currentPlayerIndex + 1) % totalPlayers,
    })),
  finish: () => {
    set({
      stage: TurnStage.end,
    });
    set({ podsRevealed: true });
    boardStore.getState().disableAllPods();
  },
  podsRevealed: false,
  revealPods() {
    logStore.getState().addLog(logEntry.allPodsRevealed());
    set({ podsRevealed: true });
  },
}));

export default useGameStore;
