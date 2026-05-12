import Building from "../classes/Building";

const BOARD_SIZE = 30;

const buildings: Building[] = [
  new Building({
    coordinates: [{ x: 1, y: 0 }],
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
      { x: 6, y: 0 },
      { x: 7, y: 0 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 0 },
      { x: 9, y: 1 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 12, y: 0 },
      { x: 13, y: 0 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 15, y: 0 },
      { x: 15, y: 1 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 18, y: 0 },
      { x: 19, y: 0 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 0 },
      { x: 21, y: 1 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 24, y: 0 },
      { x: 25, y: 0 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 27, y: 0 },
      { x: 27, y: 1 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),

  new Building({
    coordinates: [
      { x: 0, y: 6 },
      { x: 1, y: 6 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 6 },
      { x: 3, y: 7 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 6 },
      { x: 7, y: 6 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 6 },
      { x: 9, y: 7 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 12, y: 6 },
      { x: 13, y: 6 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 15, y: 6 },
      { x: 15, y: 7 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 18, y: 6 },
      { x: 19, y: 6 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 6 },
      { x: 21, y: 7 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 24, y: 6 },
      { x: 25, y: 6 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 27, y: 6 },
      { x: 27, y: 7 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),

  new Building({
    coordinates: [
      { x: 0, y: 12 },
      { x: 1, y: 12 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 12 },
      { x: 3, y: 13 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 12 },
      { x: 7, y: 12 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 12 },
      { x: 9, y: 13 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 12, y: 12 },
      { x: 13, y: 12 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 15, y: 12 },
      { x: 15, y: 13 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 18, y: 12 },
      { x: 19, y: 12 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 12 },
      { x: 21, y: 13 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 24, y: 12 },
      { x: 25, y: 12 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 27, y: 12 },
      { x: 27, y: 13 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),

  new Building({
    coordinates: [
      { x: 0, y: 18 },
      { x: 1, y: 18 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 18 },
      { x: 3, y: 19 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 18 },
      { x: 7, y: 18 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 18 },
      { x: 9, y: 19 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 12, y: 18 },
      { x: 13, y: 18 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 15, y: 18 },
      { x: 15, y: 19 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 18, y: 18 },
      { x: 19, y: 18 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 18 },
      { x: 21, y: 19 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 24, y: 18 },
      { x: 25, y: 18 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 28, y: 18 },
      { x: 28, y: 19 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),

  new Building({
    coordinates: [
      { x: 0, y: 24 },
      { x: 1, y: 24 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 24 },
      { x: 3, y: 25 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 24 },
      { x: 7, y: 24 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 24 },
      { x: 9, y: 25 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 12, y: 24 },
      { x: 13, y: 24 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 15, y: 24 },
      { x: 15, y: 25 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 18, y: 24 },
      { x: 19, y: 24 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 22, y: 24 },
      { x: 22, y: 25 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 24, y: 24 },
      { x: 25, y: 24 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 27, y: 24 },
      { x: 27, y: 25 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
];

export default buildings;
