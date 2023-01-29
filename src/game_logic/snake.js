export function moveRight(snake) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];
  const newHead = { x: head.x + 1, y: head.y };
  newSnake.push(newHead);
  newSnake.shift();
  return newSnake;
}

export function moveLeft(snake) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];
  const newHead = { x: head.x - 1, y: head.y };
  newSnake.push(newHead);
  newSnake.shift();
  return newSnake;
}

export function moveUp(snake) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];
  const newHead = { x: head.x, y: head.y - 1 };
  newSnake.push(newHead);
  newSnake.shift();
  return newSnake;
}

export function moveDown(snake) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];
  const newHead = { x: head.x, y: head.y + 1 };
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
