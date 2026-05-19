import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import TurnSection from ".";
import { usePlayersStore } from "../../store";
import { player } from "../../test/fixtures";

describe("<TurnSection />", () => {
  it("Shows click on die when player hasnt rolled", () => {
    usePlayersStore.getState().setPlayers([player]);
    render(<TurnSection />);
    expect(
      screen.getByText(`${player.name}'s turn - CLICK ON DIE!`),
    ).toBeInTheDocument();
  });

  it("Shows number of steps remaining and disabled finish turn and roll die after rolling", () => {
    usePlayersStore.getState().setPlayers([player]);
    render(<TurnSection />);
    expect(screen.getAllByRole("button")[0]).not.toHaveAttribute("disabled");
    expect(screen.getByText("Finish turn")).toHaveAttribute("disabled");

    fireEvent.click(screen.getAllByRole("button")[0]);
    expect(
      screen.getByText(
        `${player.name}'s turn - ${usePlayersStore.getState().players[0].stepsRemaining} steps remainig`,
      ),
    ).toBeInTheDocument();
    expect(screen.getAllByRole("button")[0]).toHaveAttribute("disabled");
    expect(screen.getByText("Finish turn")).toHaveAttribute("disabled");
  });

  it("Enables finish turn after using all remainig steps", () => {
    usePlayersStore
      .getState()
      .setPlayers([{ ...player, die: 6, stepsRemaining: 0 }]);
    render(<TurnSection />);

    expect(screen.getAllByRole("button")[0]).toHaveAttribute("disabled");
    expect(screen.getByText("Finish turn")).not.toHaveAttribute("disabled");

    fireEvent.click(screen.getByText("Finish turn"));
    expect(screen.getAllByRole("button")[0]).not.toHaveAttribute("disabled");
    expect(screen.getByText("Finish turn")).toHaveAttribute("disabled");
  });
});
