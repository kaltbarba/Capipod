import { describe, it, expect } from "vitest";
import { render, fireEvent } from "@testing-library/react";
import Board from ".";
import { useBoardStore, usePlayersStore, useGameStore } from "../../store";
import {
  player,
  idlePod,
  activePod,
  rockItem,
  building,
} from "../../test/fixtures";
import { getCoordinateKey } from "../../utils";
import { PodState } from "../../types";

const BOARD_SIZE = 7;

function renderBoard() {
  return render(<Board size={BOARD_SIZE} className="" />);
}

describe("<Board />", () => {
  describe("Board rendering", () => {
    it("renders the correct number of cells", () => {
      const { container } = renderBoard();

      expect(container.querySelectorAll(".board-cell")).toHaveLength(
        BOARD_SIZE * BOARD_SIZE,
      );
    });

    it("renders building class on building coordinates", () => {
      useBoardStore.getState().setBuildings([building]);

      const { container } = renderBoard();

      expect(container.querySelector(".building")).toBeInTheDocument();
    });

    it("renders shelter icon at shelter coordinate", () => {
      const shelterCoordinate = { x: 4, y: 4 };
      useBoardStore.getState().setShelterCoordinate({ coordinate: shelterCoordinate });

      const { container } = renderBoard();

      const index = shelterCoordinate.y * BOARD_SIZE + shelterCoordinate.x;
      const cells = container.querySelectorAll(".board-cell");
      expect(cells[index].querySelector("svg")).toBeInTheDocument();
    });
  });

  describe("pods", () => {
    it("does not apply pod class to idle pod when pods are not revealed", () => {
      useBoardStore.getState().setPods([idlePod]);

      const { container } = renderBoard();

      expect(container.querySelector(".idle")).not.toBeInTheDocument();
    });

    it("applies idle class to idle pod when pods are revealed", () => {
      useBoardStore.getState().setPods([idlePod]);
      useGameStore.setState({ podsRevealed: true });

      const { container } = renderBoard();

      expect(container.querySelector(".idle")).toBeInTheDocument();
    });

    it("applies active class to active pod", () => {
      useBoardStore.getState().setPods([activePod]);

      const { container } = renderBoard();

      expect(container.querySelector(".active")).toBeInTheDocument();
    });
  });

  describe("rock throwing", () => {
    it("highlights cells within rock range when rock is selected", () => {
      usePlayersStore.getState().setPlayers([player]);
      usePlayersStore.getState().setSelectedItem(rockItem);

      const { container } = renderBoard();

      expect(
        container.querySelectorAll(".selection-highlight").length,
      ).toBeGreaterThan(0);
    });

    it("does not highlight cells when no item is selected", () => {
      usePlayersStore.getState().setPlayers([player]);

      const { container } = renderBoard();

      expect(
        container.querySelector(".selection-highlight"),
      ).not.toBeInTheDocument();
    });

    it("clicking highlighted cell activates pod and clears selected item", () => {
      const podInRange = {
        ...idlePod,
        coordinate: { x: 0, y: 1 },
        state: PodState.idle,
      };
      useBoardStore.getState().setPods([podInRange]);

      const playerWithRock = { ...player, inventory: [rockItem] };
      usePlayersStore.getState().setPlayers([playerWithRock]);
      usePlayersStore.getState().setSelectedItem(rockItem);

      const { container } = renderBoard();

      const highlighted = container.querySelector(".selection-highlight");
      expect(highlighted).toBeInTheDocument();

      const podCellIndex = podInRange.coordinate.y * BOARD_SIZE + podInRange.coordinate.x;
      const cells = container.querySelectorAll(".board-cell");
      fireEvent.click(cells[podCellIndex]);
      const updatedPod = useBoardStore
        .getState()
        .podsMap.get(getCoordinateKey(podInRange.coordinate));

      expect(updatedPod?.state).toBe(PodState.active);
      expect(usePlayersStore.getState().selectedItem).toBeNull();
    });
  });
});
