import { describe, it, expect } from "vitest";
import playerStore from ".";
import boardStore from "../boardStore";
import gameStore from "../gameStore";
import {
  player,
  potionItem,
  rockItem,
  idlePod,
  activePod,
  disabledPod,
} from "../../test/fixtures";
import { getCoordinateKey } from "../../utils";
import { TurnStage, Direction, PodState } from "../../types";

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

  it("movePlayer takes damage from active pod on landing without re-activating it", () => {
    const movingPlayer = { ...player, stepsRemaining: 3 };
    const podAtNextCoordinate = { ...activePod, coordinate: { x: 1, y: 0 } };
    playerStore.getState().setPlayers([movingPlayer]);
    boardStore.getState().setPods([podAtNextCoordinate]);
    gameStore.setState({ stage: TurnStage.moving });
    playerStore.getState().movePlayer(movingPlayer, Direction.right);

    const updatedPlayer = playerStore.getState().players[0];
    expect(updatedPlayer.healthPoints).toBe(
      player.healthPoints - podAtNextCoordinate.damage,
    );

    const pod = boardStore
      .getState()
      .podsMap.get(getCoordinateKey(podAtNextCoordinate.coordinate));
    expect(pod?.state).toBe(PodState.active);
  });

  it("movePlayer does not take damage from disabled pod on landing", () => {
    const movingPlayer = { ...player, stepsRemaining: 3 };
    const podAtNextCoordinate = { ...disabledPod, coordinate: { x: 1, y: 0 } };
    playerStore.getState().setPlayers([movingPlayer]);
    boardStore.getState().setPods([podAtNextCoordinate]);
    gameStore.setState({ stage: TurnStage.moving });
    playerStore.getState().movePlayer(movingPlayer, Direction.right);

    expect(playerStore.getState().players[0].healthPoints).toBe(
      player.healthPoints,
    );
  });

  it("movePlayer does nothing when moving into a building", () => {
    const movingPlayer = { ...player, stepsRemaining: 3 };
    const buildingAtNextCoordinate = { coordinates: [{ x: 1, y: 0 }] };
    playerStore.getState().setPlayers([movingPlayer]);
    boardStore.getState().setBuildings([buildingAtNextCoordinate]);
    gameStore.setState({ stage: TurnStage.moving });
    playerStore.getState().movePlayer(movingPlayer, Direction.right);

    expect(playerStore.getState().players[0].coordinate).toEqual(
      player.coordinate,
    );
  });

  it("movePlayer does nothing when moving out of bounds", () => {
    const movingPlayer = { ...player, stepsRemaining: 3 };
    playerStore.getState().setPlayers([movingPlayer]);
    gameStore.setState({ stage: TurnStage.moving });
    playerStore.getState().movePlayer(movingPlayer, Direction.left);

    expect(playerStore.getState().players[0].coordinate).toEqual(
      player.coordinate,
    );
  });

  it("movePlayer landing on shelter finishes the game", () => {
    const shelterCoordinate = { x: 1, y: 0 };
    const movingPlayer = { ...player, stepsRemaining: 3 };
    playerStore.getState().setPlayers([movingPlayer]);
    boardStore
      .getState()
      .setShelterCoordinate({ coordinate: shelterCoordinate });
    gameStore.setState({ stage: TurnStage.moving });
    playerStore.getState().movePlayer(movingPlayer, Direction.right);

    expect(gameStore.getState().winner?.id).toBe(player.id);
  });

  it("finishPlayerTurn resets player steps and advances to next player", () => {
    const secondPlayer = {
      ...player,
      id: "player-2",
      coordinate: { x: 2, y: 0 },
    };
    const movingPlayer = { ...player, stepsRemaining: 2, die: 4 };
    playerStore.getState().setPlayers([movingPlayer, secondPlayer]);
    playerStore.getState().finishPlayerTurn(movingPlayer);

    expect(playerStore.getState().players[0].stepsRemaining).toBe(0);
    expect(playerStore.getState().players[0].die).toBe(0);
    expect(gameStore.getState().currentPlayerIndex).toBe(1);
  });

  it("consumeItem with rock activates pod at target coordinate", () => {
    const playerWithRock = { ...player, inventory: [rockItem] };
    playerStore.getState().setPlayers([playerWithRock]);
    boardStore.getState().setPods([idlePod]);
    playerStore.getState().consumeItem({
      player: playerWithRock,
      item: rockItem,
      coordinate: idlePod.coordinate,
    });

    const pod = boardStore
      .getState()
      .podsMap.get(getCoordinateKey(idlePod.coordinate));
    expect(pod?.state).toBe(PodState.active);
  });

  it("consumeItem with rock does nothing when no pod at coordinate", () => {
    const playerWithRock = { ...player, inventory: [rockItem] };
    playerStore.getState().setPlayers([playerWithRock]);
    playerStore.getState().consumeItem({
      player: playerWithRock,
      item: rockItem,
      coordinate: { x: 5, y: 5 },
    });

    expect(playerStore.getState().players[0].inventory).toHaveLength(0);
  });

  it("consumeItem with holo item reveals all pods", () => {
    const holoItem = {
      ...rockItem,
      id: "holo-1",
      category: "holo" as const,
      effect: { type: "revealPods" as const },
    };
    const playerWithHolo = { ...player, inventory: [holoItem] };
    playerStore.getState().setPlayers([playerWithHolo]);
    playerStore
      .getState()
      .consumeItem({ player: playerWithHolo, item: holoItem });

    expect(gameStore.getState().podsRevealed).toBe(true);
  });
});
