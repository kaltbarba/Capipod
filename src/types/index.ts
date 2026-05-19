export type Coordinate = {
  x: number;
  y: number;
};

export type CoordinateKey = `${number},${number}`;

type StringEnum<T extends string> = { [K in T]: K };

export type PodState = "idle" | "active" | "disabled";
export const PodState: StringEnum<PodState> = {
  idle: "idle",
  active: "active",
  disabled: "disabled",
};

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

export type ItemCategory = "potion" | "rock" | "holo";
export const ItemCategory: StringEnum<ItemCategory> = {
  potion: "potion",
  rock: "rock",
  holo: "holo",
};

export type EffectType = "heal" | "activatePod" | "revealPods";
export const EffectType: StringEnum<EffectType> = {
  heal: "heal",
  activatePod: "activatePod",
  revealPods: "revealPods",
};

export type Effect =
  | { type: typeof EffectType.heal; amount: number }
  | { type: typeof EffectType.activatePod; range: number }
  | { type: typeof EffectType.revealPods };

export type LogEntry = {
  timestamp: Date;
  message: string;
};

export type GameItem = {
  id: string;
  name: string;
  category: ItemCategory;
  coordinate: Coordinate;
  trigger: Trigger;
  effect: Effect;
};

export type Building = {
  coordinates: Coordinate[];
};

export type Pod = {
  id: string | number;
  name: string;
  coordinate: Coordinate;
  state: PodState;
  damage: number;
  duration: number;
  activeTurnsRemaining: number;
};

export type Player = {
  id: string;
  name: string;
  healthPoints: number;
  inventory: GameItem[];
  coordinate: Coordinate;
  die: number;
  stepsRemaining: number;
};

export type EffectContext = {
  effect: Effect;
  player: Player;
  direction?: Direction;
  coordinate?: Coordinate;
};

export type EffectResult = {
  playerUpdate?: Partial<Player>;
  boardUpdate?: {
    activatePod?: CoordinateKey;
  };
  log?: LogEntry;
};

export type EffectHandler = {
  [k in EffectType]: (ctx: {
    effect: Extract<Effect, { type: k }>;
    player: Player;
    direction?: Direction;
    coordinate?: Coordinate;
  }) => EffectResult;
};
