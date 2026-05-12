import { create } from "zustand";

import boardStore from "../boardStore";

import { TurnStage } from "../../types";

interface GameState {
  currentPlayerIndex: number;
  stage: TurnStage;
  setStage: (stage: TurnStage) => void;
  nextTurn: () => void;
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
}));

export default useGameStore;
