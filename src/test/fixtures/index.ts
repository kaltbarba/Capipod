import type { Pod, Player, GameItem, Building, LogEntry } from "../../types";
import { PodState, ItemCategory, EffectType, Trigger } from "../../types";

export const idlePod: Pod = {
  id: "pod-1",
  name: "Test Pod",
  coordinate: { x: 1, y: 1 },
  damage: 1,
  duration: 3,
  activeTurnsRemaining: 0,
  state: PodState.idle,
};

export const activePod: Pod = {
  id: "pod-2",
  name: "Active Pod",
  coordinate: { x: 2, y: 2 },
  damage: 2,
  duration: 3,
  activeTurnsRemaining: 3,
  state: PodState.active,
};

export const disabledPod: Pod = {
  id: "pod-3",
  name: "Disabled Pod",
  coordinate: { x: 3, y: 3 },
  damage: 1,
  duration: 0,
  activeTurnsRemaining: 0,
  state: PodState.disabled,
};

export const player: Player = {
  id: "player-1",
  name: "Kenny",
  healthPoints: 5,
  inventory: [],
  coordinate: { x: 0, y: 0 },
  die: 0,
  stepsRemaining: 0,
  color: "#F44336",
};

export const potionItem: GameItem = {
  id: "potion-1",
  name: "Health Potion",
  category: ItemCategory.potion,
  trigger: Trigger.pickup,
  effect: { type: EffectType.heal, amount: 1 },
  coordinate: { x: 0, y: 1 },
};

export const rockItem: GameItem = {
  id: "rock-1",
  name: "Rock",
  category: ItemCategory.rock,
  trigger: Trigger.pickup,
  effect: { type: EffectType.activatePod, range: 2 },
  coordinate: { x: 1, y: 0 },
};

export const building: Building = {
  coordinates: [
    { x: 5, y: 5 },
    { x: 5, y: 6 },
  ],
};

export const logEntry: LogEntry = {
  timestamp: new Date("2026-01-01T00:00:00Z"),
  message: "Test log message",
};
