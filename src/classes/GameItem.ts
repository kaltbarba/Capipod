import type { Coordinate, Effect, Trigger } from "../types";

export default class GameItem {
  public id: string;
  public name: string;
  public coordinate: Coordinate;
  public trigger: Trigger;
  public effect: Effect;

  constructor({
    id,
    name,
    coordinate,
    trigger,
    effect,
  }: {
    id: string;
    name: string;
    coordinate: Coordinate;
    trigger: Trigger;
    effect: Effect;
  }) {
    this.id = id;
    this.name = name;
    this.coordinate = coordinate;
    this.trigger = trigger;
    this.effect = effect;
  }
}
