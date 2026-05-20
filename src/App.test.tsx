import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { usePlayersStore, useBoardStore, useGameStore } from "./store";
import { player } from "./test/fixtures";
import { TurnStage } from "./types";

describe("<App />", () => {
  it("renders lobby on initial load", () => {
    render(<App />);

    expect(screen.getByText("Start Game")).toBeInTheDocument();
    expect(screen.getByText("+ Add Player")).toBeInTheDocument();
  });

  it("initializes board data on mount", () => {
    render(<App />);

    expect(useBoardStore.getState().podsMap.size).toBeGreaterThan(0);
    expect(useBoardStore.getState().buildingsMap.size).toBeGreaterThan(0);
    expect(useBoardStore.getState().itemsMap.size).toBeGreaterThan(0);
  });

  it("moves current player down on ArrowDown", () => {
    useGameStore.setState({ gameStarted: true, stage: TurnStage.moving });
    usePlayersStore.getState().setPlayers([{ ...player, stepsRemaining: 3 }]);

    render(<App />);

    fireEvent.keyDown(window, { key: "ArrowDown" });

    expect(usePlayersStore.getState().players[0].coordinate.y).toBe(1);
  });

  it("moves current player right on ArrowRight", () => {
    useGameStore.setState({ gameStarted: true, stage: TurnStage.moving });
    usePlayersStore.getState().setPlayers([{ ...player, stepsRemaining: 3 }]);

    render(<App />);

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(usePlayersStore.getState().players[0].coordinate.x).toBe(1);
  });

  it("moves current player up on ArrowUp", () => {
    useGameStore.setState({ gameStarted: true, stage: TurnStage.moving });
    usePlayersStore
      .getState()
      .setPlayers([{ ...player, coordinate: { x: 0, y: 1 }, stepsRemaining: 3 }]);

    render(<App />);

    fireEvent.keyDown(window, { key: "ArrowUp" });

    expect(usePlayersStore.getState().players[0].coordinate.y).toBe(0);
  });

  it("moves current player left on ArrowLeft", () => {
    useGameStore.setState({ gameStarted: true, stage: TurnStage.moving });
    usePlayersStore
      .getState()
      .setPlayers([{ ...player, coordinate: { x: 1, y: 0 }, stepsRemaining: 3 }]);

    render(<App />);

    fireEvent.keyDown(window, { key: "ArrowLeft" });

    expect(usePlayersStore.getState().players[0].coordinate.x).toBe(0);
  });

  it("shows winner overlay when there is a winner", () => {
    useGameStore.setState({ gameStarted: true, winner: player });

    render(<App />);

    expect(
      screen.getByText(`${player.name} reached the shelter and won the game`),
    ).toBeInTheDocument();
  });

  it("does not show winner overlay without a winner", () => {
    useGameStore.setState({ gameStarted: true });

    render(<App />);

    expect(
      screen.queryByText(/reached the shelter and won the game/),
    ).not.toBeInTheDocument();
  });
});
