export function getMiddle(board) {
  return { x: Math.ceil(board.width / 2), y: Math.ceil(board.height / 2) };
}

export function getRandomDirection() {
  const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
  const randomIndex = Math.floor(Math.random() * directions.length);
  return directions[randomIndex];
}

