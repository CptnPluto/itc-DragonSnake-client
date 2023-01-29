import { checkWallCollision, moveLeft, moveRight } from "./snake";

describe("move snake", () => {
  test("move right", () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
    const newSnake = moveRight(snake);
    expect(newSnake).toEqual([
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ]);
  });
  test("move left", () => {
    const snake = [
      { x: 3, y: 3 },
      { x: 3, y: 4 },
    ];
    const newSnake = moveLeft(snake);
    expect(newSnake).toEqual([
      { x: 3, y: 4 },
      { x: 2, y: 4 },
    ]);
  });
});

describe("check if snake is within bounds", () => {
  test("no collision", () => {
    const board = { width: 5, height: 5 };
    const snake = [
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(false);
  });
  test("no collision at left edge", () => {
    const board = { width: 5, height: 5 };
    const snake = [
      { x: 1, y: 4 },
      { x: 0, y: 4 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(false);
  });
  test("right wall collision", () => {
    const board = { width: 3, height: 3 };
    const snake = [
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(true);
  });
  test("left wall collision", () => {
    const board = { width: 21, height: 21 };
    const snake = [
      { x: 0, y: 15 },
      { x: -1, y: 15 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(true);
  });
  test("bottom wall collision", () => {
    const board = { width: 21, height: 21 };
    const snake = [
      { x: 12, y: 19 },
      { x: 12, y: 21 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(true);
  });
  test("top wall collision", () => {
    const board = { width: 7, height: 7 };
    const snake = [
      { x: 4, y: 0 },
      { x: 4, y: -1 },
    ];
    const wallCollision = checkWallCollision(snake, board);
    expect(wallCollision).toBe(true);
  });
});
