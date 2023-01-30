import { getMiddle, getRandomDirection } from "./board";

describe("get middle coordinate of board", () => {
  test("3x3 board", () => {
    const board = { width: 3, height: 3 };
    const middle = getMiddle(board);
    expect(middle).toEqual({ x: 2, y: 2 });
  });
  test("21x21 board", () => {
    const board = { width: 21, height: 21 };
    const middle = getMiddle(board);
    expect(middle).toEqual({ x: 11, y: 11 });
  });
});

describe("get random direction", () => {
  test("get random direction", () => {
    const direction = getRandomDirection();
    expect(direction).toMatch(/UP|DOWN|LEFT|RIGHT/);
  });
});
