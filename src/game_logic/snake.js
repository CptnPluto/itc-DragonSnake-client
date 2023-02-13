export function move(snake, direction) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];

  let newHead;

  switch (direction) {
    case "UP":
      newHead = { row: head.row - 1, col: head.col };
      break;
    case "DOWN":
      newHead = { row: head.row + 1, col: head.col };
      break;
    case "LEFT":
      newHead = { row: head.row, col: head.col - 1 };
      break;
    case "RIGHT":
      newHead = { row: head.row, col: head.col + 1 };
      break;
    default:
      throw new Error("Invalid direction");
  }
  const newSnakeWithNewHead = [...newSnake, newHead];
  const snakeWithoutTail = newSnakeWithNewHead.slice(1);
  return snakeWithoutTail;
}

export const getDirectionFromKeyboard = (key) => {
  switch (key) {
    case "ArrowUp":
      return "UP";
    case "ArrowDown":
      return "DOWN";
    case "ArrowLeft":
      return "LEFT";
    case "ArrowRight":
      return "RIGHT";
    default:
      break;
  }
};

export function checkWallCollision(snake, board) {
  const head = snake[snake.length - 1];
  return (
    head.row < 0 ||
    head.col < 0 ||
    head.col > board.cols - 1 ||
    head.row > board.rows - 1
  );
}

export function eat(snake) {
  const newSnake = [...snake];
  newSnake.unshift(newSnake[0]);
  return newSnake;
}

export function checkSelfCollision(snake) {
  const head = snake[snake.length - 1];
  const body = snake.slice(0, snake.length - 1);
  return body.some(
    (segment) => segment.row === head.row && segment.col === head.col
  );
}
