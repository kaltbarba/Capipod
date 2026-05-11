import type { Coordinate, PodState } from "../types";

export default class Pod {
  public id: string | number;
  public name: string;
  public coordinate: Coordinate;
  public state: PodState = "idle";

  constructor({
    id,
    name,
    coordinate,
  }: {
    id: string | number;
    name: string;
    coordinate: Coordinate;
  }) {
    this.id = id;
    this.name = name;
    this.coordinate = coordinate;
  }
}
