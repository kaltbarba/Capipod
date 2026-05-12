import type { Coordinate, PodState } from "../types";

export default class Pod {
  public id: string | number;
  public name: string;
  public coordinate: Coordinate;
  public state: PodState = "idle";
  public damage: number;

  constructor({
    id,
    name,
    coordinate,
    damage = 1,
  }: {
    id: string | number;
    name: string;
    coordinate: Coordinate;
    damage: number;
  }) {
    this.id = id;
    this.name = name;
    this.coordinate = coordinate;
    this.damage = damage;
  }
}
