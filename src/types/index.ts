export type Coordinate = {
  x: number;
  y: number;
};

export type CoordinateKey = `${number},${number}`;

export type PodState = "idle" | "active" | "disabled";

type StringEnum<T extends string> = { [K in T]: K };

export type Direction = "up" | "down" | "left" | "right";
export const Direction: StringEnum<Direction> = {
  up: "up",
  down: "down",
  right: "right",
  left: "left",
};

export type TurnStage = "start" | "moving" | "end";
export const TurnStage: StringEnum<TurnStage> = {
  start: "start",
  moving: "moving",
  end: "end",
};

export type Trigger = "auto" | "pickup";
export const Trigger: StringEnum<Trigger> = {
  auto: "auto",
  pickup: "pickup",
};

export type ItemCategory = "potion" | "rock";
export const ItemCategory: StringEnum<ItemCategory> = {
  potion: "potion",
  rock: "rock",
};

export type EffectType = "heal" | "activatePod";
export const EffectType: StringEnum<EffectType> = {
  heal: "heal",
  activatePod: "activatePod",
};
export type Effect =
  | { type: typeof EffectType.heal; amount: number }
  | { type: typeof EffectType.activatePod; range: number };
