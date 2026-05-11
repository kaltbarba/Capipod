import type { Coordinate } from "../types";

import { isCoordinateValid } from "../utils/isCoordinateValid";

export default class Building {
  public coordinates: Coordinate[];
  public color: string;
  private boardSize: number;

  constructor({
    coordinates,
    color,
    boardSize,
  }: {
    coordinates: Coordinate[];
    color: string;
    boardSize: number;
  }) {
    this.boardSize = boardSize;

    if (!isCoordinateValid(coordinates, boardSize)) {
      throw new Error("Invalid building coordinates");
    }

    this.coordinates = coordinates;
    this.color = color;
  }
}
