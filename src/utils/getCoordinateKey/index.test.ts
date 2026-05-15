import { describe, it, expect } from "vitest";
import { getCoordinateKey } from ".";

describe("getCoordinateKey", () => {
  it("getCoordinateKey", () => {
    const coordinateKey = getCoordinateKey({ x: 25, y: 7 });
    expect(coordinateKey).toBe("25,7");
  });
});
