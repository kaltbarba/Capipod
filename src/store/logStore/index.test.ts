import { describe, it, expect } from "vitest";
import logStore from ".";
import { logEntry } from "../../test/fixtures";

describe("logStore", () => {
  it("logs", () => {
    expect(logStore.getState().logs.length).toBe(0);
    logStore.getState().addLog(logEntry);

    expect(logStore.getState().logs.length).toBe(1);

    logStore.getState().clearLogs();
    expect(logStore.getState().logs.length).toBe(0);
  });
});
