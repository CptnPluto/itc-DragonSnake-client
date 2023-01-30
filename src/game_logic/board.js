// export function createBoard(rows, cols, snake)

export function insertSnake(cells, snake) {
  // loop through snake
  for (let segmentI = 0; segmentI < snake.length; segmentI++) {
    // loop through cells
    for (let cellsI = 0; cellsI < cells.length; cellsI++) {
      if (
        cells[cellsI].row === snake[segmentI].row &&
        cells[cellsI].col === snake[segmentI].col
      ) {
        // if its the last segment, it's the head
        if (segmentI === snake.length - 1) {
          cells[cellsI].isHead = true;
          return cells;
        }
        cells[cellsI].isTail = true;
      }
    }
  }
  return cells;
}

export function getMiddle(board) {
  return { row: Math.ceil(board.width / 2), col: Math.ceil(board.height / 2) };
}

export function getRandomDirection() {
  const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
  const randomIndex = Math.floor(Math.random() * directions.length);
  return directions[randomIndex];
}
