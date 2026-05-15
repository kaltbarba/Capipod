import type { Coordinate, CoordinateKey } from "../../types";

export const getCoordinateKey = (coordinate: Coordinate): CoordinateKey =>
  `${coordinate.x},${coordinate.y}`;
