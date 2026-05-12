export type Coordinate = {
  x: number;
  y: number;
};

export type PodState = "idle" | "active" | "disabled";

export interface Item {
  id: string | number;
  name: string;
}

export type Direction = "up" | "down" | "left" | "right";
export const Direction: { [k in Direction]: k } = {
  up: "up",
  down: "down",
  right: "right",
  left: "left",
};

export type TurnStage = "start" | "moving" | "end";
export const TurnStage: { [k in TurnStage]: TurnStage } = {
  start: "start",
  moving: "moving",
  end: "end",
};
