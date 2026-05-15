import { describe, it, expect } from "vitest";
import { getCoordinateKey, getNextCoordinate } from ".";

describe("index", () => {
  it("getCoordinateKey", () => {
    const coordinateKey = getCoordinateKey({ x: 25, y: 7 });
    expect(coordinateKey).toBe("25,7");
  });

  it("getNextCoordinate", () => {
    expect(getNextCoordinate({ x: 25, y: 7 }, "up", 2)).toStrictEqual({
      x: 25,
      y: 5,
    });
    expect(getNextCoordinate({ x: 25, y: 7 }, "down", 1)).toStrictEqual({
      x: 25,
      y: 8,
    });
    expect(getNextCoordinate({ x: 25, y: 7 }, "right", 2)).toStrictEqual({
      x: 27,
      y: 7,
    });
    expect(getNextCoordinate({ x: 25, y: 7 }, "left", 1)).toStrictEqual({
      x: 24,
      y: 7,
    });
  });
});
