import { getMiddle, getRandomDirection, insertSnake } from "./board";

describe("get middle coordinate of board", () => {
  test("3x3 board", () => {
    const board = { width: 3, height: 3 };
    const middle = getMiddle(board);
    expect(middle).toEqual({ row: 2, col: 2 });
  });
  test("21x21 board", () => {
    const board = { width: 21, height: 21 };
    const middle = getMiddle(board);
    expect(middle).toEqual({ row: 11, col: 11 });
  });
});

describe("get random direction", () => {
  test("get random direction", () => {
    const direction = getRandomDirection();
    expect(direction).toMatch(/UP|DOWN|LEFT|RIGHT/);
  });
});

describe("inserting snakes", () => {
  test("snake inserted at top left", () => {
    const ROWS = 3;
    const COLS = 3;
    // BOARD SIZE (px) IN Game.css
    const INITIAL_DIRECTION = "RIGHT";
    const INITIAL_SPEED = 1000;
    const cells = [];

    for (let i = 0; i < ROWS; i++) {
      for (let j = 0; j < COLS; j++) {
        cells.push({
          row: i,
          col: j,
          isHead: false,
          isTail: false,
          isFood: false,
        });
      }
    }

    const snake = [
      { row: 0, col: 0 },
      { row: 1, col: 0 },
      { row: 2, col: 0 },
    ];
    const newBoard = insertSnake(cells, snake);
    // console.log(newBoard);
    expect(newBoard).toEqual([
      { row: 0, col: 0, isTail: true, isHead: false, isFood: false },
      { row: 0, col: 1, isTail: false, isHead: false, isFood: false },
      { row: 0, col: 2, isTail: false, isHead: false, isFood: false },
      { row: 1, col: 0, isTail: true, isHead: false, isFood: false },
      { row: 1, col: 1, isTail: false, isHead: false, isFood: false },
      { row: 1, col: 2, isTail: false, isHead: false, isFood: false },
      { row: 2, col: 0, isTail: false, isHead: true, isFood: false },
      { row: 2, col: 1, isTail: false, isHead: false, isFood: false },
      { row: 2, col: 2, isTail: false, isHead: false, isFood: false },
    ]);
  });
});
