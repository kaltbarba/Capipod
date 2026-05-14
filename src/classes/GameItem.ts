import type { Coordinate, Effect, ItemCategory, Trigger } from "../types";

export default class GameItem {
  public id: string;
  public name: string;
  public category: ItemCategory;
  public coordinate: Coordinate;
  public trigger: Trigger;
  public effect: Effect;

  constructor({
    id,
    name,
    category,
    coordinate,
    trigger,
    effect,
  }: {
    id: string;
    name: string;
    category: ItemCategory;
    coordinate: Coordinate;
    trigger: Trigger;
    effect: Effect;
  }) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.coordinate = coordinate;
    this.trigger = trigger;
    this.effect = effect;
  }
}
