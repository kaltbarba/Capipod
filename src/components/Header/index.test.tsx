import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from ".";
import { usePlayersStore } from "../../store";
import { player } from "../../test/fixtures";

describe("<Header />", () => {
  it("renders no player cards when there are no players", () => {
    render(<Header />);
    expect(screen.queryByText(player.name)).not.toBeInTheDocument();
  });

  it("renders a player card for each player", () => {
    const secondPlayer = {
      ...player,
      id: "player-2",
      name: "Andres",
      color: "#FAFAFA" as `#${string}`,
    };
    usePlayersStore.getState().setPlayers([player, secondPlayer]);
    render(<Header />);
    expect(screen.getByText(player.name)).toBeInTheDocument();
    expect(screen.getByText(secondPlayer.name)).toBeInTheDocument();
  });
});
