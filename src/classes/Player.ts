import type { Item, Coordinate, Pod } from "../types";
import { Direction } from "../types";

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

  public registerPodDamage(pod: Pod): this {
    this.healthPoints -= pod.damage;

    return this;
  }

  // to be used/deleted later on/someday
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

  public nextCoordinate(direction: Direction): Coordinate {
    return {
      [Direction.up]: { x: this.coordinate.x, y: this.coordinate.y - 1 },
      [Direction.down]: { x: this.coordinate.x, y: this.coordinate.y + 1 },
      [Direction.left]: { x: this.coordinate.x - 1, y: this.coordinate.y },
      [Direction.right]: { x: this.coordinate.x + 1, y: this.coordinate.y },
    }[direction];
  }

  get die(): number {
    return this._die;
  }

  get stepsRemaining(): number {
    return this._stepsRemaining;
  }
}
