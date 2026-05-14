import type { Pod } from "../types";
import { PodState } from "../types";

const pods: Pod[] = [
  { id: 1,  name: "Tar Flood",        coordinate: { x: 2,  y: 2  }, state: PodState.idle, damage: 1, duration: 3, activeTurnsRemaining: 0 },
  { id: 2,  name: "Lizard Mutts",     coordinate: { x: 8,  y: 5  }, state: PodState.idle, damage: 2, duration: 4, activeTurnsRemaining: 0 },
  { id: 3,  name: "Firestorm",        coordinate: { x: 15, y: 3  }, state: PodState.idle, damage: 3, duration: 2, activeTurnsRemaining: 0 },
  { id: 4,  name: "Bullet Rain",      coordinate: { x: 22, y: 7  }, state: PodState.idle, damage: 2, duration: 3, activeTurnsRemaining: 0 },
  { id: 5,  name: "Net Trap",         coordinate: { x: 29, y: 0  }, state: PodState.idle, damage: 1, duration: 5, activeTurnsRemaining: 0 },
  { id: 6,  name: "Toxic Gas",        coordinate: { x: 5,  y: 14 }, state: PodState.idle, damage: 2, duration: 5, activeTurnsRemaining: 0 },
  { id: 7,  name: "Spike Wall",       coordinate: { x: 12, y: 20 }, state: PodState.idle, damage: 3, duration: 2, activeTurnsRemaining: 0 },
  { id: 8,  name: "Electrified",      coordinate: { x: 20, y: 25 }, state: PodState.idle, damage: 3, duration: 3, activeTurnsRemaining: 0 },
  { id: 9,  name: "Freeze Ray",       coordinate: { x: 27, y: 18 }, state: PodState.idle, damage: 1, duration: 6, activeTurnsRemaining: 0 },
  { id: 10, name: "Darkness",         coordinate: { x: 29, y: 29 }, state: PodState.idle, damage: 2, duration: 4, activeTurnsRemaining: 0 },
  { id: 11, name: "Acid Rain",        coordinate: { x: 4,  y: 3  }, state: PodState.idle, damage: 2, duration: 4, activeTurnsRemaining: 0 },
  { id: 12, name: "Mutant Wolf",      coordinate: { x: 11, y: 2  }, state: PodState.idle, damage: 3, duration: 3, activeTurnsRemaining: 0 },
  { id: 13, name: "Tracker Jacker",   coordinate: { x: 17, y: 5  }, state: PodState.idle, damage: 3, duration: 2, activeTurnsRemaining: 0 },
  { id: 14, name: "Oil Slick",        coordinate: { x: 26, y: 3  }, state: PodState.idle, damage: 1, duration: 5, activeTurnsRemaining: 0 },
  { id: 15, name: "Wire Trap",        coordinate: { x: 1,  y: 10 }, state: PodState.idle, damage: 2, duration: 1, activeTurnsRemaining: 0 },
  { id: 16, name: "Smoke Screen",     coordinate: { x: 8,  y: 11 }, state: PodState.idle, damage: 1, duration: 4, activeTurnsRemaining: 0 },
  { id: 17, name: "Landmine",         coordinate: { x: 14, y: 9  }, state: PodState.idle, damage: 3, duration: 1, activeTurnsRemaining: 0 },
  { id: 18, name: "Acid Pool",        coordinate: { x: 23, y: 10 }, state: PodState.idle, damage: 2, duration: 5, activeTurnsRemaining: 0 },
  { id: 19, name: "Razor Wire",       coordinate: { x: 28, y: 8  }, state: PodState.idle, damage: 1, duration: 3, activeTurnsRemaining: 0 },
  { id: 20, name: "Mutant Birds",     coordinate: { x: 2,  y: 16 }, state: PodState.idle, damage: 2, duration: 4, activeTurnsRemaining: 0 },
  { id: 21, name: "Whirlwind",        coordinate: { x: 10, y: 15 }, state: PodState.idle, damage: 1, duration: 6, activeTurnsRemaining: 0 },
  { id: 22, name: "Blood Rain",       coordinate: { x: 19, y: 14 }, state: PodState.idle, damage: 3, duration: 2, activeTurnsRemaining: 0 },
  { id: 23, name: "Lava Pool",        coordinate: { x: 26, y: 17 }, state: PodState.idle, damage: 3, duration: 3, activeTurnsRemaining: 0 },
  { id: 24, name: "Sniper",           coordinate: { x: 4,  y: 21 }, state: PodState.idle, damage: 2, duration: 4, activeTurnsRemaining: 0 },
  { id: 25, name: "Collapsing Floor", coordinate: { x: 16, y: 22 }, state: PodState.idle, damage: 2, duration: 1, activeTurnsRemaining: 0 },
  { id: 26, name: "Poison Dart",      coordinate: { x: 23, y: 23 }, state: PodState.idle, damage: 1, duration: 5, activeTurnsRemaining: 0 },
  { id: 27, name: "Mortar",           coordinate: { x: 7,  y: 26 }, state: PodState.idle, damage: 3, duration: 2, activeTurnsRemaining: 0 },
  { id: 28, name: "Crushing Wall",    coordinate: { x: 13, y: 28 }, state: PodState.idle, damage: 2, duration: 3, activeTurnsRemaining: 0 },
  { id: 29, name: "Energy Blast",     coordinate: { x: 21, y: 27 }, state: PodState.idle, damage: 1, duration: 4, activeTurnsRemaining: 0 },
  { id: 30, name: "Firetrap",         coordinate: { x: 28, y: 26 }, state: PodState.idle, damage: 3, duration: 2, activeTurnsRemaining: 0 },
];

export default pods;
