import type { Coordinate } from "../types";
import { Direction } from "../types";

import type { GameItem, Pod } from ".";

export default class Player {
  public healthPoints: number;
  public name: string;
  public inventory: GameItem[];
  private _coordinate: Coordinate;
  private _die: number = 0;
  private _stepsRemaining: number = 0;

  constructor({
    healthPoints,
    name,
    inventory,
    coordinate,
  }: {
    healthPoints: number;
    name: string;
    inventory: GameItem[];
    coordinate: Coordinate;
  }) {
    this.healthPoints = healthPoints;
    this.name = name;
    this.inventory = inventory;
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
    this._coordinate.y -= 1;
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

  public addToInventory(item: GameItem): this {
    this.inventory.push(item);
    return this;
  }

  public removeFromInventory(item: GameItem): this {
    this.inventory = this.inventory.filter((i) => i.id !== item.id);
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

  public heal(amount: number): this {
    this.healthPoints += amount;

    return this;
  }
}
