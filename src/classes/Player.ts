import type { Item, Coordinate } from "../types";

export default class Player {
  public healthPoints: number;
  public name: string;
  private _items: Item[];
  private _coordinate: Coordinate;
  private _die: number = 0;
  private _stepsRemaining: number = 0;

  constructor({
    healthPoints,
    name,
    items,
    coordinate,
  }: {
    healthPoints: number;
    name: string;
    items: Item[];
    coordinate: Coordinate;
  }) {
    this.healthPoints = healthPoints;
    this.name = name;
    this._items = items;
    this._coordinate = coordinate;
  }

  public moveTo(coordinate: Coordinate): this {
    this._coordinate = coordinate;

    return this;
  }

  public moveUp(): this {
    this.coordinate.y -= 1;
    this._stepsRemaining--;
    return this;
  }

  public moveDown(): this {
    this._coordinate.y += 1;
    this._stepsRemaining--;
    return this;
  }

  public moveLeft(): this {
    this._coordinate.x -= 1;
    this._stepsRemaining--;
    return this;
  }

  public moveRight(): this {
    this._coordinate.x += 1;
    this._stepsRemaining--;
    return this;
  }

  public pickUpItem(item: Item): this {
    this._items.push(item);
    return this;
  }

  get coordinate(): Coordinate {
    return this._coordinate;
  }

  public rollDie(): number {
    this._die = Math.floor(Math.random() * 6) + 1;
    this._stepsRemaining = this._die;
    return this._die;
  }

  get die(): number {
    return this._die;
  }

  get stepsRemaining(): number {
    return this._stepsRemaining;
  }
}
