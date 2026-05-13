import GameItem from "../classes/GameItem";
import { EffectType, Trigger } from "../types";

const ItemsData: GameItem[] = [
  new GameItem({
    id: "potion-1",
    name: "Health Potion",
    trigger: Trigger.pickup,
    effect: { type: EffectType.heal, amount: 1 },
    coordinate: { x: 0, y: 1 },
  }),
  new GameItem({
    id: "potion-2",
    name: "Health Potion",
    trigger: Trigger.pickup,
    effect: { type: EffectType.heal, amount: 1 },
    coordinate: { x: 12, y: 4 },
  }),
  new GameItem({
    id: "potion-3",
    name: "Health Potion",
    trigger: Trigger.pickup,
    effect: { type: EffectType.heal, amount: 1 },
    coordinate: { x: 18, y: 22 },
  }),
  new GameItem({
    id: "potion-4",
    name: "Health Potion",
    trigger: Trigger.pickup,
    effect: { type: EffectType.heal, amount: 1 },
    coordinate: { x: 25, y: 10 },
  }),
  new GameItem({
    id: "potion-5",
    name: "Health Potion",
    trigger: Trigger.pickup,
    effect: { type: EffectType.heal, amount: 1 },
    coordinate: { x: 8, y: 27 },
  }),
  new GameItem({
    id: "rock-1",
    name: "Rock",
    trigger: Trigger.pickup,
    effect: { type: EffectType.activatePod, range: 1 },
    coordinate: { x: 6, y: 14 },
  }),
  new GameItem({
    id: "rock-2",
    name: "Rock",
    trigger: Trigger.pickup,
    effect: { type: EffectType.activatePod, range: 1 },
    coordinate: { x: 11, y: 9 },
  }),
  new GameItem({
    id: "rock-3",
    name: "Rock",
    trigger: Trigger.pickup,
    effect: { type: EffectType.activatePod, range: 1 },
    coordinate: { x: 20, y: 5 },
  }),
  new GameItem({
    id: "rock-4",
    name: "Rock",
    trigger: Trigger.pickup,
    effect: { type: EffectType.activatePod, range: 1 },
    coordinate: { x: 24, y: 16 },
  }),
  new GameItem({
    id: "rock-5",
    name: "Rock",
    trigger: Trigger.pickup,
    effect: { type: EffectType.activatePod, range: 1 },
    coordinate: { x: 17, y: 28 },
  }),
];

export default ItemsData;
