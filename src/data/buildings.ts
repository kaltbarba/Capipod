import Building from "../classes/Building";

const BOARD_SIZE = 30;

const buildings: Building[] = [
  new Building({
    coordinates: [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 0 },
      { x: 3, y: 1 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 5, y: 0 },
      { x: 6, y: 0 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 8, y: 0 },
      { x: 8, y: 1 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 10, y: 0 },
      { x: 11, y: 0 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 13, y: 0 },
      { x: 13, y: 1 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 0, y: 3 },
      { x: 1, y: 3 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 3 },
      { x: 3, y: 4 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 5, y: 3 },
      { x: 6, y: 3 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 8, y: 3 },
      { x: 8, y: 4 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 10, y: 3 },
      { x: 11, y: 3 },
    ],
    color: "#e74c3c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 13, y: 3 },
      { x: 13, y: 4 },
    ],
    color: "#3498db",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 0, y: 6 },
      { x: 1, y: 6 },
    ],
    color: "#9b59b6",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 6 },
      { x: 3, y: 7 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 5, y: 6 },
      { x: 6, y: 6 },
    ],
    color: "#2ecc71",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 8, y: 6 },
      { x: 8, y: 7 },
    ],
    color: "#e74c3c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 10, y: 6 },
      { x: 11, y: 6 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 13, y: 6 },
      { x: 13, y: 7 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 0, y: 9 },
      { x: 1, y: 9 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 9 },
      { x: 3, y: 10 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
];

export default buildings;
