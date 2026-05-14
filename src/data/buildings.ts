import Building from "../classes/Building";

const BOARD_SIZE = 30;

const buildings: Building[] = [
  new Building({
    coordinates: [
      { x: 0, y: 2 },
      { x: 0, y: 3 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 0, y: 6 },
      { x: 0, y: 7 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 0, y: 11 },
      { x: 0, y: 12 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 0, y: 16 },
      { x: 0, y: 17 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 0, y: 21 },
      { x: 0, y: 22 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 0, y: 26 },
      { x: 0, y: 27 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 1 },
      { x: 3, y: 2 },
      { x: 4, y: 2 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 3 },
      { x: 1, y: 4 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 4 },
      { x: 4, y: 4 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 1 },
      { x: 7, y: 1 },
      { x: 8, y: 1 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 1 },
      { x: 9, y: 2 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 3 },
      { x: 6, y: 4 },
      { x: 7, y: 4 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 8, y: 3 }],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 13, y: 1 },
      { x: 14, y: 1 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 11, y: 1 }],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 3 },
      { x: 11, y: 4 },
      { x: 12, y: 3 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 13, y: 3 },
      { x: 14, y: 3 },
      { x: 14, y: 4 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 1 },
      { x: 17, y: 1 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 19, y: 1 },
      { x: 19, y: 2 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 3 },
      { x: 16, y: 4 },
      { x: 17, y: 4 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 18, y: 3 },
      { x: 19, y: 3 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 1 },
      { x: 22, y: 1 },
      { x: 23, y: 1 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 24, y: 1 },
      { x: 24, y: 2 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 3 },
      { x: 21, y: 4 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 23, y: 3 },
      { x: 24, y: 3 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 27, y: 1 },
      { x: 28, y: 1 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 26, y: 1 },
      { x: 26, y: 2 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 27, y: 3 },
      { x: 27, y: 4 },
      { x: 28, y: 4 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 29, y: 2 },
      { x: 29, y: 3 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 6 },
      { x: 2, y: 6 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 4, y: 6 },
      { x: 4, y: 7 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 8 },
      { x: 1, y: 9 },
      { x: 2, y: 9 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 7 },
      { x: 4, y: 7 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 6 },
      { x: 7, y: 6 },
      { x: 7, y: 7 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 6 },
      { x: 9, y: 7 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 8 },
      { x: 7, y: 8 },
      { x: 8, y: 8 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 9, y: 9 }],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 12, y: 6 },
      { x: 13, y: 6 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 7 },
      { x: 11, y: 8 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 13, y: 7 },
      { x: 14, y: 7 },
      { x: 14, y: 8 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 12, y: 9 }],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 6 },
      { x: 17, y: 6 },
      { x: 18, y: 6 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 8 },
      { x: 16, y: 9 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 18, y: 8 },
      { x: 19, y: 8 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 19, y: 6 }],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 6 },
      { x: 21, y: 7 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 23, y: 6 },
      { x: 24, y: 6 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 23, y: 8 },
      { x: 24, y: 8 },
      { x: 24, y: 9 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 21, y: 9 }],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 26, y: 6 },
      { x: 27, y: 6 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 29, y: 6 },
      { x: 29, y: 7 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 26, y: 8 },
      { x: 26, y: 9 },
      { x: 27, y: 9 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 28, y: 7 }],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 2, y: 11 },
      { x: 3, y: 11 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 12 },
      { x: 1, y: 13 },
      { x: 2, y: 13 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 4, y: 11 },
      { x: 4, y: 12 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 3, y: 14 }],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 11 },
      { x: 7, y: 11 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 11 },
      { x: 9, y: 12 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 7, y: 12 },
      { x: 7, y: 13 },
      { x: 8, y: 13 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 9, y: 14 }],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 11 },
      { x: 12, y: 11 },
      { x: 13, y: 11 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 13 },
      { x: 11, y: 14 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 13, y: 13 },
      { x: 14, y: 13 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 14, y: 11 }],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 11 },
      { x: 17, y: 11 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 19, y: 11 },
      { x: 19, y: 12 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 13 },
      { x: 16, y: 14 },
      { x: 17, y: 14 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 18, y: 13 }],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 11 },
      { x: 22, y: 11 },
      { x: 22, y: 12 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 24, y: 11 },
      { x: 24, y: 12 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 13 },
      { x: 22, y: 13 },
      { x: 23, y: 13 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 27, y: 11 },
      { x: 28, y: 11 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 26, y: 12 },
      { x: 26, y: 13 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 28, y: 13 },
      { x: 29, y: 13 },
      { x: 29, y: 14 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 16 },
      { x: 1, y: 17 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 16 },
      { x: 4, y: 16 },
      { x: 4, y: 17 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 18 },
      { x: 2, y: 18 },
      { x: 3, y: 18 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 4, y: 19 }],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 16 },
      { x: 7, y: 16 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 16 },
      { x: 9, y: 17 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 18 },
      { x: 6, y: 19 },
      { x: 7, y: 19 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 8, y: 18 }],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 16 },
      { x: 12, y: 16 },
      { x: 13, y: 16 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 18 },
      { x: 11, y: 19 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 13, y: 18 },
      { x: 14, y: 18 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 17, y: 16 },
      { x: 18, y: 16 },
      { x: 18, y: 17 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 17 },
      { x: 16, y: 18 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 18, y: 19 },
      { x: 19, y: 19 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 16 },
      { x: 22, y: 16 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 23, y: 17 },
      { x: 23, y: 18 },
      { x: 24, y: 18 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 18 },
      { x: 21, y: 19 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 27, y: 16 },
      { x: 28, y: 16 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 29, y: 16 },
      { x: 29, y: 17 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 26, y: 18 },
      { x: 27, y: 18 },
      { x: 27, y: 19 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 28, y: 19 }],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 21 },
      { x: 2, y: 21 },
      { x: 3, y: 21 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 23 },
      { x: 1, y: 24 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 3, y: 23 },
      { x: 4, y: 23 },
      { x: 4, y: 24 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 21 },
      { x: 7, y: 21 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 21 },
      { x: 9, y: 22 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 23 },
      { x: 6, y: 24 },
      { x: 7, y: 24 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 8, y: 23 }],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 21 },
      { x: 12, y: 21 },
      { x: 13, y: 21 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 23 },
      { x: 11, y: 24 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 13, y: 23 },
      { x: 14, y: 23 },
      { x: 14, y: 24 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 17, y: 21 },
      { x: 18, y: 21 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 19, y: 21 },
      { x: 19, y: 22 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 23 },
      { x: 17, y: 23 },
      { x: 17, y: 24 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 19, y: 24 }],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 21 },
      { x: 22, y: 21 },
      { x: 22, y: 22 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 24, y: 21 },
      { x: 24, y: 22 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 21, y: 23 },
      { x: 22, y: 23 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 24, y: 24 }],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 26, y: 21 },
      { x: 27, y: 21 },
      { x: 28, y: 21 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 26, y: 23 },
      { x: 26, y: 24 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 28, y: 23 },
      { x: 29, y: 23 },
      { x: 29, y: 24 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 26 },
      { x: 2, y: 26 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 4, y: 26 },
      { x: 4, y: 27 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 1, y: 28 },
      { x: 2, y: 28 },
      { x: 2, y: 29 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 4, y: 29 }],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 6, y: 26 }],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 9, y: 26 },
      { x: 9, y: 27 },
    ],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 6, y: 28 },
      { x: 7, y: 28 },
      { x: 7, y: 29 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 9, y: 29 }],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 26 },
      { x: 12, y: 26 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 14, y: 26 },
      { x: 14, y: 27 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 11, y: 28 },
      { x: 12, y: 28 },
      { x: 12, y: 29 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 14, y: 29 }],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 26 },
      { x: 17, y: 26 },
      { x: 18, y: 26 },
    ],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 19, y: 26 },
      { x: 19, y: 27 },
    ],
    color: "#16a085",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 16, y: 28 },
      { x: 16, y: 29 },
      { x: 17, y: 29 },
    ],
    color: "#d35400",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 18, y: 29 }],
    color: "#2c3e50",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 22, y: 26 },
      { x: 23, y: 26 },
      { x: 24, y: 26 },
    ],
    color: "#f39c12",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 22, y: 28 },
      { x: 22, y: 29 },
    ],
    color: "#1abc9c",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 23, y: 28 },
      { x: 24, y: 28 },
      { x: 24, y: 29 },
    ],
    color: "#c0392b",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 26, y: 26 },
      { x: 27, y: 26 },
    ],
    color: "#2980b9",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 29, y: 26 },
      { x: 29, y: 27 },
    ],
    color: "#27ae60",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [
      { x: 26, y: 28 },
      { x: 27, y: 28 },
      { x: 27, y: 29 },
    ],
    color: "#8e44ad",
    boardSize: BOARD_SIZE,
  }),
  new Building({
    coordinates: [{ x: 28, y: 29 }],
    color: "#e67e22",
    boardSize: BOARD_SIZE,
  }),
];

export default buildings;
