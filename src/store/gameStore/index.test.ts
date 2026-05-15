import { describe, it, expect, beforeEach } from "vitest";
import gameStore from ".";
import { TurnStage } from "../../types";

describe("gameStore", () => {
  const initialState = gameStore.getState();
  beforeEach(() => {
    gameStore.setState(initialState);
  });

  it("finish sets stage to end", () => {
    expect(gameStore.getState().stage).toBe(TurnStage.start);

    gameStore.getState().setStage(TurnStage.moving);
    expect(gameStore.getState().stage).toBe(TurnStage.moving);

    gameStore.getState().finish();
    expect(gameStore.getState().stage).toBe(TurnStage.end);
  });

  it("finishTurn sets game stage to start and move to next player index", () => {
    expect(gameStore.getState().currentPlayerIndex).toBe(0);
    gameStore.getState().finishTurn(4);
    expect(gameStore.getState().stage).toBe(TurnStage.start);
    expect(gameStore.getState().currentPlayerIndex).toBe(1);
  });

  it("revealPods sets podsRevealed to true", () => {
    gameStore.getState().revealPods();
    expect(gameStore.getState().podsRevealed).toBe(true);
  });
});
