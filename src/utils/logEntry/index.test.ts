import { describe, it, expect } from "vitest";
import * as logEntry from ".";

describe("logEntry", () => {
  it("playerMoved", () => {
    const log = logEntry.playerMoved({
      playerName: "Kenny",
      coordinate: { x: 1, y: 2 },
      direction: "right",
    });
    expect(log.message).toBe("Kenny moved right to [1, 2]");
    expect(log.timestamp).toBeInstanceOf(Date);
  });

  it("podDamagedPlayer", () => {
    const log = logEntry.podDamagedPlayer({
      playerName: "Andres",
      podName: "Meet Grinder",
      podDamage: 2,
    });
    expect(log.message).toBe("Meet Grinder dealt 2 to Andres");
  });

  it("itemPickedUp", () => {
    const log = logEntry.itemPickedUp({
      playerName: "Kenny",
      itemName: "Potion",
    });
    expect(log.message).toBe("Kenny picked up Potion");
  });

  it("podActivated", () => {
    const log = logEntry.podActivated("Kenny", "Meat Grinder");
    expect(log.message).toBe("Kenny activated Meat Grinder");
  });

  it("playerRolledDie", () => {
    const log = logEntry.playerRolledDie({ playerName: "Kenny", dieValue: 4 });
    expect(log.message).toBe("Kenny rolled a 4");
  });

  it("playerReachedShelter", () => {
    const log = logEntry.playerReachedShelter({ playerName: "Kenny" });
    expect(log.message).toBe("Kenny reached the shelter. Game ended.");
  });

  it("allPodsRevealed", () => {
    const log = logEntry.allPodsRevealed();
    expect(log.message).toBe("All pods are now visible");
  });

  it("playerHealed", () => {
    const log = logEntry.playerHealed({ playerName: "Kenny", amount: 2 });
    expect(log.message).toBe("Kenny healed for 2 HP");
  });

  it("playerUsedItem", () => {
    const log = logEntry.playerUsedItem({ playerName: "Kenny", itemName: "Rock" });
    expect(log.message).toBe("Kenny used Rock");
  });
});
