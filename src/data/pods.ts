import Pod from "../classes/Pod";

const pods: Pod[] = [
  new Pod({ id: 1, name: "Tar Flood", coordinate: { x: 5, y: 5 } }),
  new Pod({ id: 2, name: "Lizard Mutts", coordinate: { x: 20, y: 5 } }),
  new Pod({ id: 3, name: "Firestorm", coordinate: { x: 35, y: 5 } }),
  new Pod({ id: 4, name: "Bullet Rain", coordinate: { x: 50, y: 5 } }),
  new Pod({ id: 5, name: "Net Trap", coordinate: { x: 5, y: 20 } }),
  new Pod({ id: 6, name: "Toxic Gas", coordinate: { x: 20, y: 20 } }),
  new Pod({ id: 7, name: "Spike Wall", coordinate: { x: 35, y: 20 } }),
  new Pod({ id: 8, name: "Electrified", coordinate: { x: 50, y: 20 } }),
  new Pod({ id: 9, name: "Freeze Ray", coordinate: { x: 5, y: 35 } }),
  new Pod({ id: 10, name: "Darkness", coordinate: { x: 20, y: 35 } }),
  new Pod({ id: 11, name: "Noise Bomb", coordinate: { x: 35, y: 35 } }),
];

export default pods;
