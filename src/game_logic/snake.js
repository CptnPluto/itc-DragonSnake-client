// Snake requirements:
// odd number of rows and columns
// Initial direction - random
// Initial length - 2
// Initial location - the middle
// dead if it hits the wall
// each direction works
// snake grows when it eats food
// snake dies when it hits itself

function moveRight(snake) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];
  const newHead = { x: head.x + 1, y: head.y };
  newSnake.push(newHead);
  newSnake.shift();
  return newSnake;
}

function moveLeft(snake) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];
  const newHead = { x: head.x - 1, y: head.y };
  newSnake.push(newHead);
  newSnake.shift();
  return newSnake;
}

function moveUp(snake) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];
  const newHead = { x: head.x, y: head.y - 1 };
  newSnake.push(newHead);
  newSnake.shift();
  return newSnake;
}

function moveDown(snake) {
  const newSnake = [...snake];
  const head = newSnake[newSnake.length - 1];
  const newHead = { x: head.x, y: head.y + 1 };
  newSnake.push(newHead);
  newSnake.shift();
  return newSnake;
}

function checkWallCollision(snake, board) {
  const head = snake[snake.length - 1];
  return (
    head.x < 0 ||
    head.y < 0 ||
    head.x > board.width - 1 ||
    head.y > board.height - 1
  );
}

function eat(snake) {
  const newSnake = [...snake];
  newSnake.unshift(newSnake[0]);
  return newSnake;
}

module.exports = {
  moveRight,
  moveLeft,
  moveUp,
  moveDown,
  eat,
  checkWallCollision,
};
