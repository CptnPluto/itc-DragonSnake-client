export function move(snake, direction) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];
  let newHead;
  switch (direction) {
    case "UP":
      newHead = { x: head.x, y: head.y - 1 };
      break;
    case "DOWN":
      newHead = { x: head.x, y: head.y + 1 };
      break;
    case "LEFT":
      newHead = { x: head.x - 1, y: head.y };
      break;
    case "RIGHT":
      newHead = { x: head.x + 1, y: head.y };
      break;
    default:
      throw new Error("Invalid direction");
  }
  newSnake.push(newHead);
  newSnake.shift();
  return newSnake;
}

export function checkWallCollision(snake, board) {
  const head = snake[snake.length - 1];
  return (
    head.x < 0 ||
    head.y < 0 ||
    head.x > board.width - 1 ||
    head.y > board.height - 1
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
  return body.some((segment) => segment.x === head.x && segment.y === head.y);
}
