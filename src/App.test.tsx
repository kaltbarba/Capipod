import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { usePlayersStore, useBoardStore, useGameStore } from "./store";
import { player } from "./test/fixtures";
import { TurnStage } from "./types";

describe("<App />", () => {
  it("initializes with two players on mount", () => {
    render(<App />);

    expect(screen.getByText("Kenny")).toBeInTheDocument();
    expect(screen.getByText("Andres")).toBeInTheDocument();
  });

  it("initializes board data on mount", () => {
    render(<App />);

    expect(useBoardStore.getState().podsMap.size).toBeGreaterThan(0);
    expect(useBoardStore.getState().buildingsMap.size).toBeGreaterThan(0);
    expect(useBoardStore.getState().itemsMap.size).toBeGreaterThan(0);
  });

  it("moves current player down on ArrowDown", () => {
    render(<App />);

    const storePlayer = usePlayersStore.getState().players[0];
    usePlayersStore
      .getState()
      .setPlayers([{ ...storePlayer, stepsRemaining: 3 }]);
    useGameStore.setState({ stage: TurnStage.moving });

    fireEvent.keyDown(window, { key: "ArrowDown" });

    expect(usePlayersStore.getState().players[0].coordinate.y).toBe(1);
  });

  it("moves current player right on ArrowRight", () => {
    render(<App />);

    const storePlayer = usePlayersStore.getState().players[0];
    usePlayersStore
      .getState()
      .setPlayers([{ ...storePlayer, stepsRemaining: 3 }]);
    useGameStore.setState({ stage: TurnStage.moving });

    fireEvent.keyDown(window, { key: "ArrowRight" });

    expect(usePlayersStore.getState().players[0].coordinate.x).toBe(1);
  });

  it("moves current player up on ArrowUp", () => {
    render(<App />);

    const storePlayer = usePlayersStore.getState().players[0];
    usePlayersStore
      .getState()
      .setPlayers([
        { ...storePlayer, coordinate: { x: 0, y: 1 }, stepsRemaining: 3 },
      ]);
    useGameStore.setState({ stage: TurnStage.moving });

    fireEvent.keyDown(window, { key: "ArrowUp" });

    expect(usePlayersStore.getState().players[0].coordinate.y).toBe(0);
  });

  it("moves current player left on ArrowLeft", () => {
    render(<App />);

    const storePlayer = usePlayersStore.getState().players[0];
    usePlayersStore
      .getState()
      .setPlayers([
        { ...storePlayer, coordinate: { x: 1, y: 0 }, stepsRemaining: 3 },
      ]);
    useGameStore.setState({ stage: TurnStage.moving });

    fireEvent.keyDown(window, { key: "ArrowLeft" });

    expect(usePlayersStore.getState().players[0].coordinate.x).toBe(0);
  });

  it("shows winner overlay when there is a winner", () => {
    useGameStore.setState({ winner: player });

    render(<App />);

    expect(
      screen.getByText(`${player.name} reached the shelter and won the game`),
    ).toBeInTheDocument();
  });

  it("does not show winner overlay without a winner", () => {
    render(<App />);

    expect(
      screen.queryByText(/reached the shelter and won the game/),
    ).not.toBeInTheDocument();
  });
});
