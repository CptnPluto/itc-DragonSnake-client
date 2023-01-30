export function getRandomFood(board, snake) {
  const food = {
    x: Math.floor(Math.random() * board.width),
    y: Math.floor(Math.random() * board.height),
  };
  return snake.some((segment) => segment.x === food.x && segment.y === food.y)
    ? getRandomFood(board, snake)
    : food;
}
