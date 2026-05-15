import type { Coordinate, CoordinateKey } from "../types";
import { Direction } from "../types";

export * as logEntry from "./logEntry";

export const getNextCoordinate = (
  coordinate: Coordinate,
  direction: Direction,
  steps: number = 1,
): Coordinate => {
  return {
    [Direction.up]: { x: coordinate.x, y: coordinate.y - 1 * steps },
    [Direction.down]: { x: coordinate.x, y: coordinate.y + 1 * steps },
    [Direction.left]: { x: coordinate.x - 1 * steps, y: coordinate.y },
    [Direction.right]: { x: coordinate.x + 1 * steps, y: coordinate.y },
  }[direction];
};

export const getCoordinateKey = (coordinate: Coordinate): CoordinateKey =>
  `${coordinate.x},${coordinate.y}`;
