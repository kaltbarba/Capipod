import type { Coordinate } from "../../types";

export const isCoordinateValid = (
  coordinate: Coordinate | Coordinate[],
  boardSize: number,
): boolean => {
  if (!Array.isArray(coordinate)) {
    coordinate = [coordinate];
  }

  for (let i = 0; i < coordinate.length - 1; i++) {
    if (
      coordinate.length > 1 &&
      !isCoordinateAdjacent(coordinate[i], coordinate[i + 1])
    ) {
      return false;
    } else if (!isWithinBoardLimits(coordinate[i], boardSize)) {
      return false;
    }
  }

  return true;
};

export const isCoordinateAdjacent = (
  coordinate1: Coordinate,
  coordinate2: Coordinate,
): boolean => {
  const dx = Math.abs(coordinate2.x - coordinate1.x);
  const dy = Math.abs(coordinate2.y - coordinate1.y);
  return (dx === 1 && dy === 0) || (dx === 0 && dy === 1);
};

export const isWithinBoardLimits = (
  coordinate: Coordinate,
  boardSize: number,
): boolean => {
  return (
    coordinate.x >= 0 &&
    coordinate.y >= 0 &&
    coordinate.x < boardSize &&
    coordinate.y < boardSize
  );
};
