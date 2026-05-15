import { describe, it, expect } from "vitest";
import playerStore from ".";
import boardStore from "../boardStore";
import gameStore from "../gameStore";
import { player, potionItem, rockItem, idlePod } from "../../test/fixtures";
import { getCoordinateKey } from "../../utils";
import { TurnStage, Direction } from "../../types";

describe("playerStore", () => {
  it("setPlayers sets players and playersMap", () => {
    expect(playerStore.getState().players.length).toBe(0);

    playerStore.getState().setPlayers([player]);
    expect(playerStore.getState().players.length).toBe(1);
    expect(
      playerStore
        .getState()
        .playersMap.get(getCoordinateKey(player.coordinate)),
    ).toBe(player);
  });

  it("setSelectedItem sets and clears selectedItem", () => {
    playerStore.getState().setSelectedItem(rockItem);
    expect(playerStore.getState().selectedItem).toEqual(rockItem);

    playerStore.getState().setSelectedItem(null);
    expect(playerStore.getState().selectedItem).toBeNull();
  });

  it("rollDieForPlayer sets die and stepsRemaining", () => {
    playerStore.getState().setPlayers([player]);
    playerStore.getState().rollDieForPlayer(player);

    const updatedPlayer = playerStore.getState().players[0];
    expect(updatedPlayer.die).toBeGreaterThanOrEqual(1);
    expect(updatedPlayer.die).toBeLessThanOrEqual(6);
    expect(updatedPlayer.stepsRemaining).toBe(updatedPlayer.die);
  });

  it("consumeItem heals player and removes item from inventory", () => {
    const playerWithPotion = { ...player, inventory: [potionItem] };
    playerStore.getState().setPlayers([playerWithPotion]);

    playerStore
      .getState()
      .consumeItem({ player: playerWithPotion, item: potionItem });

    const updatedPlayer = playerStore.getState().players[0];
    expect(updatedPlayer.healthPoints).toBe(player.healthPoints + 1);
    expect(updatedPlayer.inventory.length).toBe(0);
  });

  it("consumeItem removes rock from inventory and clears selectedItem", () => {
    const playerWithRock = { ...player, inventory: [rockItem] };
    playerStore.getState().setPlayers([playerWithRock]);
    playerStore.getState().setSelectedItem(rockItem);
    boardStore.getState().setPods([idlePod]);

    playerStore.getState().consumeItem({
      player: playerWithRock,
      item: rockItem,
      coordinate: idlePod.coordinate,
    });

    const updatedPlayer = playerStore.getState().players[0];
    expect(updatedPlayer.inventory.length).toBe(0);
    expect(playerStore.getState().selectedItem).toBeNull();
  });

  it("movePlayer does nothing if stepsRemaining is 0", () => {
    playerStore.getState().setPlayers([player]);
    playerStore.getState().movePlayer(player, "right");
    expect(playerStore.getState().players[0].coordinate).toEqual(
      player.coordinate,
    );
  });

  it("movePlayer moves player and decrements stepsRemaining", () => {
    const movingPlayer = { ...player, stepsRemaining: 3 };
    playerStore.getState().setPlayers([movingPlayer]);
    gameStore.setState({ stage: TurnStage.moving });

    playerStore.getState().movePlayer(movingPlayer, "right");

    const updatedPlayer = playerStore.getState().players[0];
    expect(updatedPlayer.coordinate).toEqual({ x: 1, y: 0 });
    expect(updatedPlayer.stepsRemaining).toBe(2);
  });

  it("movePlayer picks up item on landing", () => {
    const movingPlayer = { ...player, stepsRemaining: 3 };
    playerStore.getState().setPlayers([movingPlayer]);
    boardStore.getState().setItems([potionItem]);
    gameStore.setState({ stage: TurnStage.moving });

    playerStore.getState().movePlayer(movingPlayer, Direction.down);

    const updatedPlayer = playerStore.getState().players[0];
    expect(updatedPlayer.inventory.length).toBe(1);
    expect(updatedPlayer.inventory[0].id).toBe(potionItem.id);
  });

  it("movePlayer takes damage from idle pod on landing", () => {
    const movingPlayer = { ...player, stepsRemaining: 3 };
    const podAtNextCoordinate = { ...idlePod, coordinate: { x: 1, y: 0 } };
    playerStore.getState().setPlayers([movingPlayer]);
    boardStore.getState().setPods([podAtNextCoordinate]);
    gameStore.setState({ stage: TurnStage.moving });

    playerStore.getState().movePlayer(movingPlayer, Direction.right);

    const updatedPlayer = playerStore.getState().players[0];
    expect(updatedPlayer.healthPoints).toBe(
      player.healthPoints - podAtNextCoordinate.damage,
    );
  });
});
