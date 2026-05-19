import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import ItemButton from ".";
import PotionIcon from "../../assets/potion.svg?react";

describe("<ItemButton />", () => {
  it("renders empty when quantity is 0", () => {
    render(
      <ItemButton
        quantity={0}
        disabled={false}
        onClick={() => {}}
        iconComponent={PotionIcon}
      />,
    );
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
  });

  it("renders icon and quantity when quantity is greater than 0", () => {
    render(
      <ItemButton
        quantity={3}
        disabled={false}
        onClick={() => {}}
        iconComponent={PotionIcon}
      />,
    );
    expect(screen.getByText("3")).toBeInTheDocument();
  });

  it("calls onClick when clicked and not disabled", () => {
    const onClick = vi.fn();
    render(
      <ItemButton
        quantity={1}
        disabled={false}
        onClick={onClick}
        iconComponent={PotionIcon}
      />,
    );
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("onClick is not called  when disabled", () => {
    const onClick = vi.fn();
    render(
      <ItemButton
        quantity={1}
        disabled={true}
        onClick={onClick}
        iconComponent={PotionIcon}
      />,
    );
    const button = screen.getByRole("button");
    expect(button).toHaveAttribute("disabled");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});
