import Pod from "../classes/Pod";

const pods: Pod[] = [
  new Pod({ id: 1,  name: "Tar Flood",    coordinate: { x: 2,  y: 2  }, damage: 1 }),
  new Pod({ id: 2,  name: "Lizard Mutts", coordinate: { x: 8,  y: 5  }, damage: 2 }),
  new Pod({ id: 3,  name: "Firestorm",    coordinate: { x: 15, y: 3  }, damage: 3 }),
  new Pod({ id: 4,  name: "Bullet Rain",  coordinate: { x: 22, y: 7  }, damage: 2 }),
  new Pod({ id: 5,  name: "Net Trap",     coordinate: { x: 29, y: 0  }, damage: 1 }),
  new Pod({ id: 6,  name: "Toxic Gas",    coordinate: { x: 5,  y: 14 }, damage: 2 }),
  new Pod({ id: 7,  name: "Spike Wall",   coordinate: { x: 12, y: 20 }, damage: 3 }),
  new Pod({ id: 8,  name: "Electrified",  coordinate: { x: 20, y: 25 }, damage: 3 }),
  new Pod({ id: 9,  name: "Freeze Ray",   coordinate: { x: 27, y: 18 }, damage: 1 }),
  new Pod({ id: 10, name: "Darkness",     coordinate: { x: 29, y: 29 }, damage: 2 }),
];

export default pods;
