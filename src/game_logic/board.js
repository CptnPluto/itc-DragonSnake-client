// export function createBoard(rows, cols, snake)

export function insertSnake(board, snake) {
  // loop through snake
  for (let segmentI = 0; segmentI < snake.length; segmentI++) {
    // loop through board
    for (let boardI = 0; boardI < board.length; boardI++) {
      if (
        board[boardI].row === snake[segmentI].row &&
        board[boardI].col === snake[segmentI].col
      ) {
        // if its the last segment, it's the head
        if (segmentI === snake.length - 1) {
          board[boardI].isHead = true;
          return board;
        }
        board[boardI].isTail = true;
      }
    }
  }
  return board;
}

export function getMiddle(board) {
  return { row: Math.ceil(board.width / 2), col: Math.ceil(board.height / 2) };
}

export function getRandomDirection() {
  const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
  const randomIndex = Math.floor(Math.random() * directions.length);
  return directions[randomIndex];
}
