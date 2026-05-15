import { describe, it, expect, beforeEach } from "vitest";
import boardStore from ".";
import { idlePod, activePod, building, potionItem } from "../../test/fixtures";
import { getCoordinateKey } from "../../utils";
import { PodState } from "../../types";

describe("boardStore - buildings", () => {
  const initialBoardState = boardStore.getState();
  beforeEach(() => {
    boardStore.setState(initialBoardState);
  });

  it("setBuildings sets buildingsMap", () => {
    expect(boardStore.getState().buildings.length).toBe(0);

    boardStore.getState().setBuildings([building]);
    expect(boardStore.getState().buildings.length).toBe(1);
    expect(
      boardStore
        .getState()
        .buildingsMap.get(getCoordinateKey(building.coordinates[0])),
    ).toBe(building);
  });
});

describe("boardStore - items", () => {
  const initialState = boardStore.getState();
  beforeEach(() => {
    boardStore.setState(initialState);
  });

  it("setItems sets itemsMap", () => {
    expect(
      boardStore
        .getState()
        .itemsMap.has(getCoordinateKey(potionItem.coordinate)),
    ).toBe(false);

    boardStore.getState().setItems([potionItem]);
    expect(
      boardStore
        .getState()
        .itemsMap.get(getCoordinateKey(potionItem.coordinate)),
    ).toBe(potionItem);
  });

  it("removeItem", () => {
    boardStore.getState().setItems([potionItem]);

    boardStore.getState().removeItem(getCoordinateKey(potionItem.coordinate));
    expect(
      boardStore
        .getState()
        .itemsMap.has(getCoordinateKey(potionItem.coordinate)),
    ).toBe(false);
  });
});

describe("boardStore - pods", () => {
  const initialState = boardStore.getState();
  beforeEach(() => {
    boardStore.setState(initialState);
  });

  it("setPods sets podsMap", () => {
    expect(boardStore.getState().pods.length).toBe(0);

    boardStore.getState().setPods([idlePod]);
    expect(boardStore.getState().pods.length).toBe(1);
    expect(
      boardStore.getState().podsMap.get(getCoordinateKey(idlePod.coordinate)),
    ).toBe(idlePod);
  });

  it("activatePod actives pod at coordinate", () => {
    boardStore.getState().setPods([idlePod]);
    expect(
      boardStore.getState().podsMap.get(getCoordinateKey(idlePod.coordinate))
        ?.state,
    ).toBe(PodState.idle);

    boardStore.getState().activatePod(getCoordinateKey(idlePod.coordinate));
    expect(
      boardStore.getState().podsMap.get(getCoordinateKey(idlePod.coordinate))
        ?.state,
    ).toBe(PodState.active);
  });

  it("disableAllPods", () => {
    boardStore.getState().setPods([activePod]);
    expect(
      boardStore.getState().podsMap.get(getCoordinateKey(activePod.coordinate))
        ?.state,
    ).toBe(PodState.active);

    boardStore.getState().disableAllPods();
    expect(
      boardStore.getState().podsMap.get(getCoordinateKey(activePod.coordinate))
        ?.state,
    ).toBe(PodState.disabled);
  });

  it("tickPods reduces active pods activeTurnsRemaining", () => {
    boardStore.getState().setPods([idlePod, activePod]);
    expect(
      boardStore.getState().podsMap.get(getCoordinateKey(activePod.coordinate))
        ?.activeTurnsRemaining,
    ).toBe(3);

    boardStore.getState().tickPods();
    boardStore.getState().tickPods();
    expect(
      boardStore.getState().podsMap.get(getCoordinateKey(activePod.coordinate))
        ?.activeTurnsRemaining,
    ).toBe(1);

    boardStore.getState().tickPods();
    expect(
      boardStore.getState().podsMap.get(getCoordinateKey(activePod.coordinate))
        ?.activeTurnsRemaining,
    ).toBe(0);
    expect(
      boardStore.getState().podsMap.get(getCoordinateKey(activePod.coordinate))
        ?.state,
    ).toBe(PodState.disabled);
  });
});
