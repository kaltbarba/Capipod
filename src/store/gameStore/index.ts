import { create } from "zustand";

import LogEntry from "../../classes/LogEntry";

import boardStore from "../boardStore";
import logStore from "../logStore";

import { TurnStage } from "../../types";

interface GameState {
  currentPlayerIndex: number;
  stage: TurnStage;
  setStage: (stage: TurnStage) => void;
  nextTurn: () => void;
  finish: () => void;
  podsRevealed: boolean;
  revealPods: () => void;
}

const useGameStore = create<GameState>((set) => ({
  currentPlayerIndex: 0,
  stage: TurnStage.start,
  nextTurn: () => {
    set((state) => ({
      stage: TurnStage.start,
      currentPlayerIndex:
        (state.currentPlayerIndex + 1) % boardStore.getState().players.length,
    }));
  },
  setStage: (stage) => set({ stage }),
  finish: () => {
    set({
      stage: TurnStage.end,
    });
  },
  podsRevealed: false,
  revealPods() {
    logStore.getState().addLog(LogEntry.allPodsRevealed());
    set({ podsRevealed: true });
  },
}));

export default useGameStore;
