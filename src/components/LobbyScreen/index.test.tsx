import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import LobbyScreen from ".";

function addPlayer(name: string) {
  fireEvent.click(screen.getByText("+ Add Player"));
  fireEvent.change(screen.getByLabelText("Name"), { target: { value: name } });
  fireEvent.click(screen.getByRole("button", { name: /confirm/i }));
}

describe("<LobbyScreen />", () => {
  it("renders title", () => {
    render(<LobbyScreen onStart={vi.fn()} />);

    expect(screen.getByText("CapiPOD")).toBeInTheDocument();
  });

  it("start game button is disabled with fewer than 2 players", () => {
    render(<LobbyScreen onStart={vi.fn()} />);

    expect(screen.getByRole("button", { name: /start game/i })).toBeDisabled();
  });

  it("add player button opens the setup dialog", () => {
    render(<LobbyScreen onStart={vi.fn()} />);

    fireEvent.click(screen.getByText("+ Add Player"));

    expect(screen.getByText("Player 1 Setup")).toBeInTheDocument();
  });

  it("added player appears in the list", () => {
    render(<LobbyScreen onStart={vi.fn()} />);

    addPlayer("Kenny");

    expect(screen.getByText("Kenny")).toBeInTheDocument();
  });

  it("start game button is enabled with 2 players", () => {
    render(<LobbyScreen onStart={vi.fn()} />);

    addPlayer("Kenny");
    addPlayer("Andres");

    expect(
      screen.getByRole("button", { name: /start game/i }),
    ).not.toBeDisabled();
  });

  it("hides add player button when max players reached", () => {
    render(<LobbyScreen onStart={vi.fn()} />);

    addPlayer("Player 1");
    addPlayer("Player 2");
    addPlayer("Player 3");
    addPlayer("Player 4");

    expect(screen.queryByText("+ Add Player")).not.toBeInTheDocument();
  });

  it("removes a player when remove button is clicked", () => {
    render(<LobbyScreen onStart={vi.fn()} />);

    addPlayer("Kenny");
    fireEvent.click(screen.getByRole("button", { name: /remove/i }));

    expect(screen.queryByText("Kenny")).not.toBeInTheDocument();
  });

  it("calls onStart with configured players", () => {
    const onStart = vi.fn();
    render(<LobbyScreen onStart={onStart} />);

    addPlayer("Kenny");
    addPlayer("Andres");
    fireEvent.click(screen.getByRole("button", { name: /start game/i }));

    expect(onStart).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({ name: "Kenny" }),
        expect.objectContaining({ name: "Andres" }),
      ]),
    );
  });
});
