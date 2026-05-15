import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import LogSection from ".";
import { useLogStore } from "../../store";
import { logEntry } from "../../test/fixtures";

describe("<LogSection />", () => {
  it("shows no messages if there are no logs", () => {
    render(<LogSection />);
    expect(screen.getByText("No messages")).toBeInTheDocument();
  });

  it("shows log messages", () => {
    useLogStore.getState().addLog(logEntry);
    render(<LogSection />);
    expect(screen.getByText(logEntry.message)).toBeInTheDocument();
  });
});
