import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import PlayerSetupDialog from ".";

const COLORS: `#${string}`[] = ["#00BCD4", "#8BC34A", "#F44336"];

function renderSetup(onSubmit = vi.fn()) {
  return render(
    <PlayerSetupDialog
      isOpen={true}
      title="Player 1 Setup"
      colors={COLORS}
      onSubmit={onSubmit}
    />,
  );
}

describe("<PlayerSetupDialog />", () => {
  it("renders title", () => {
    renderSetup();

    expect(screen.getByText("Player 1 Setup")).toBeInTheDocument();
  });

  it("renders each color", () => {
    renderSetup();

    const radios = screen.getAllByRole("radio");
    expect(radios).toHaveLength(COLORS.length);
  });

  it("selects the first color by default", () => {
    renderSetup();

    const radios = screen.getAllByRole("radio");
    expect(radios[0]).toBeChecked();
    expect(radios[1]).not.toBeChecked();
  });

  it("confirm button is disabled when name is empty", () => {
    renderSetup();

    expect(screen.getByRole("button", { name: /confirm/i })).toBeDisabled();
  });

  it("confirm button is enabled when name is filled", () => {
    renderSetup();

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Kenny" },
    });

    expect(screen.getByRole("button", { name: /confirm/i })).not.toBeDisabled();
  });

  it("calls onSubmit with name and selected color", () => {
    const onSubmit = vi.fn();
    renderSetup(onSubmit);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Kenny" },
    });
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(onSubmit).toHaveBeenCalledWith({ name: "Kenny", color: COLORS[0] });
  });

  it("calls onSubmit with the selected color when changed", () => {
    const onSubmit = vi.fn();
    renderSetup(onSubmit);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Andres" },
    });
    fireEvent.click(screen.getAllByRole("radio")[1]);
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(onSubmit).toHaveBeenCalledWith({ name: "Andres", color: COLORS[1] });
  });

  it("trims whitespace from the submitted name", () => {
    const onSubmit = vi.fn();
    renderSetup(onSubmit);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "  Kenny  " },
    });
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(onSubmit).toHaveBeenCalledWith({ name: "Kenny", color: COLORS[0] });
  });

  it("does not call onSubmit when name is only whitespace", () => {
    const onSubmit = vi.fn();
    renderSetup(onSubmit);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "   " },
    });
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it("resets name and color after submit", () => {
    const onSubmit = vi.fn();
    renderSetup(onSubmit);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Kenny" },
    });
    fireEvent.click(screen.getAllByRole("radio")[1]);
    fireEvent.click(screen.getByRole("button", { name: /confirm/i }));

    expect(screen.getByLabelText("Name")).toHaveValue("");
    expect(screen.getAllByRole("radio")[0]).toBeChecked();
  });
});
