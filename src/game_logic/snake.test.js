import { checkSelfCollision, checkWallCollision, eat, move } from "./snake";

describe("move snake", () => {
  test("move right", () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
    const newSnake = move(snake, "RIGHT");
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
    const newSnake = move(snake, "LEFT");
    expect(newSnake).toEqual([
      { x: 3, y: 4 },
      { x: 2, y: 4 },
    ]);
  });
  test("move up", () => {
    const snake = [
      { x: 4, y: 5 },
      { x: 5, y: 5 },
    ];
    const newSnake = move(snake, "UP");
    expect(newSnake).toEqual([
      { x: 5, y: 5 },
      { x: 5, y: 4 },
    ]);
  });
  test("move down", () => {
    const snake = [
      { x: 4, y: 5 },
      { x: 5, y: 5 },
    ];
    const newSnake = move(snake, "DOWN");
    expect(newSnake).toEqual([
      { x: 5, y: 5 },
      { x: 5, y: 6 },
    ]);
  });
  test("move right 3 times", () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
    const newSnake = move(snake, "RIGHT");
    const newSnake2 = move(newSnake, "RIGHT");
    const newSnake3 = move(newSnake2, "RIGHT");
    expect(newSnake3).toEqual([
      { x: 3, y: 0 },
      { x: 4, y: 0 },
    ]);
  });
});

describe("check wall collision", () => {
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

describe("eat", () => {
  test("check that snake has an extra tail after eating", () => {
    const snake = [
      { x: 3, y: 4 },
      { x: 3, y: 5 },
    ];
    const newSnake = eat(snake);
    expect(newSnake).toEqual([
      { x: 3, y: 4 },
      { x: 3, y: 4 },
      { x: 3, y: 5 },
    ]);
  });
});

describe("check self collision", () => {
  test("no self collision", () => {
    const snake = [
      { x: 1, y: 3 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 5, y: 3 },
      { x: 6, y: 3 },
      { x: 7, y: 3 },
      { x: 8, y: 3 },
      { x: 9, y: 3 },
    ];
    const isSelfCollision = checkSelfCollision(snake);
    expect(isSelfCollision).toBe(false);
  });
  test("snake ran into its tail", () => {
    const snake = [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 4, y: 2 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
    ];
    const isSelfCollision = checkSelfCollision(snake);
    expect(isSelfCollision).toBe(true);
  });
  test("snake ran into its body", () => {
    const snake = [
      { x: 2, y: 1 },
      { x: 2, y: 2 },
      { x: 2, y: 3 },
      { x: 3, y: 3 },
      { x: 4, y: 3 },
      { x: 4, y: 2 },
      { x: 3, y: 2 },
      { x: 2, y: 2 },
    ];
    const isSelfCollision = checkSelfCollision(snake);
    expect(isSelfCollision).toBe(true);
  });
});

describe("eat and move", () => {
  test("snake eats and moves right", () => {
    const snake = [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
    ];
    const snakeThatAte = eat(snake);
    const snakeThatAteAndMoved = move(snakeThatAte, "RIGHT");
    expect(snakeThatAteAndMoved).toEqual([
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
    ]);
  });
  test("snake eats and moves left", () => {
    const snake = [
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
    ];
    const snakeThatAte = eat(snake);
    const snakeThatAteAndMoved = move(snakeThatAte, "LEFT");
    expect(snakeThatAteAndMoved).toEqual([
      { x: 10, y: 10 },
      { x: 10, y: 11 },
      { x: 10, y: 12 },
      { x: 9, y: 12 },
    ]);
  });
});
