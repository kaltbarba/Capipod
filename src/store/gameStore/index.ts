import { create } from "zustand";

import * as LogEntry from "../../utils/logEntry";

import boardStore from "../boardStore";
import logStore from "../logStore";

import { TurnStage } from "../../types";

interface GameState {
  currentPlayerIndex: number;
  stage: TurnStage;
  setStage: (stage: TurnStage) => void;
  nextTurn: (totalPlayers: number) => void;
  finish: () => void;
  podsRevealed: boolean;
  revealPods: () => void;
}

const useGameStore = create<GameState>((set) => ({
  currentPlayerIndex: 0,
  stage: TurnStage.start,
  nextTurn: (totalPlayers) => {
    boardStore.getState().tickPods();
    set((state) => ({
      stage: TurnStage.start,
      currentPlayerIndex: (state.currentPlayerIndex + 1) % totalPlayers,
    }));
  },
  setStage: (stage) => set({ stage }),
  finish: () => {
    set({
      stage: TurnStage.end,
    });
    set({ podsRevealed: true });
    boardStore.getState().disableAllPods();
  },
  podsRevealed: false,
  revealPods() {
    logStore.getState().addLog(LogEntry.allPodsRevealed());
    set({ podsRevealed: true });
  },
}));

export default useGameStore;
