import { describe, it, expect } from "vitest";
import gameStore from ".";
import { TurnStage } from "../../types";

describe("gameStore", () => {
  it("finish sets stage to end", () => {
    expect(gameStore.getState().stage).toBe(TurnStage.start);

    gameStore.getState().setStage(TurnStage.moving);
    expect(gameStore.getState().stage).toBe(TurnStage.moving);

    gameStore.getState().finish();
    expect(gameStore.getState().stage).toBe(TurnStage.end);
  });

  it("nextPlayer move index to the second player and back to first one", () => {
    expect(gameStore.getState().currentPlayerIndex).toBe(0);

    gameStore.getState().nextPlayer(2);
    expect(gameStore.getState().currentPlayerIndex).toBe(1);

    gameStore.getState().nextPlayer(2);
    expect(gameStore.getState().currentPlayerIndex).toBe(0);
  });

  it("revealPods sets podsRevealed to true", () => {
    gameStore.getState().revealPods();
    expect(gameStore.getState().podsRevealed).toBe(true);
  });
});
