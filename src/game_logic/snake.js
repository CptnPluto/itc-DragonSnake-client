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
  newSnake.push(newHead);
  newSnake.shift();
  return newSnake;
}

export const setDirectionFromKeyboard = (setDirection) => {
  return (e) => {
    console.log(e);
    switch (e.key) {
      case "ArrowUp":
        setDirection("UP");
        break;
      case "ArrowDown":
        setDirection("DOWN");
        break;
      case "ArrowLeft":
        setDirection("LEFT");
        break;
      case "ArrowRight":
        setDirection("RIGHT");
        break;
      default:
        break;
    }
  };
};

export function checkWallCollision(snake, board) {
  const head = snake[snake.length - 1];
  return (
    head.row < 0 ||
    head.col < 0 ||
    head.row > board.width - 1 ||
    head.col > board.height - 1
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
