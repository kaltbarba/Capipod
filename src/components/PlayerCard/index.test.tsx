import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlayerCard from ".";
import { usePlayersStore, useGameStore } from "../../store";
import { player, potionItem, rockItem } from "../../test/fixtures";

describe("<PlayerCard />", () => {
  it("renders player name", () => {
    usePlayersStore.getState().setPlayers([player]);

    render(<PlayerCard player={player} />);

    expect(screen.getByText(player.name)).toBeInTheDocument();
  });

  it("highlights card when it's the player's turn", () => {
    usePlayersStore.getState().setPlayers([player]);

    const { container } = render(<PlayerCard player={player} />);

    expect(container.firstChild).toHaveClass("ring-3");
  });

  it("does not highlight card when it's not the player's turn", () => {
    const secondPlayer = { ...player, id: "player-2", name: "Andres" };
    usePlayersStore.getState().setPlayers([player, secondPlayer]);
    useGameStore.setState({ currentPlayerIndex: 1 });

    const { container } = render(<PlayerCard player={player} />);

    expect(container.firstChild).not.toHaveClass("ring-3");
  });

  it("shows potion count when player has potions", () => {
    const playerWithPotion = { ...player, inventory: [potionItem] };
    usePlayersStore.getState().setPlayers([playerWithPotion]);

    render(<PlayerCard player={playerWithPotion} />);

    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("item buttons are disabled when it's not the player's turn", () => {
    const secondPlayer = { ...player, id: "player-2", name: "Andres" };
    usePlayersStore.getState().setPlayers([player, secondPlayer]);
    useGameStore.setState({ currentPlayerIndex: 1 });

    const playerWithItems = { ...player, inventory: [potionItem, rockItem] };
    render(<PlayerCard player={playerWithItems} />);

    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toBeDisabled();
    expect(buttons[1]).toBeDisabled();
  });

  it("consuming potion removes it from inventory", () => {
    const playerWithPotion = { ...player, inventory: [potionItem] };
    usePlayersStore.getState().setPlayers([playerWithPotion]);

    render(<PlayerCard player={playerWithPotion} />);

    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(usePlayersStore.getState().players[0].inventory).toHaveLength(0);
  });

  it("clicking on rock sets it as selectedItem", () => {
    const playerWithRock = { ...player, inventory: [rockItem] };
    usePlayersStore.getState().setPlayers([playerWithRock]);

    render(<PlayerCard player={playerWithRock} />);

    fireEvent.click(screen.getAllByRole("button")[1]);
    expect(usePlayersStore.getState().selectedItem).toEqual(rockItem);
  });
});
