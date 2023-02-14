// export function createBoard(rows, cols, snake)

export function insertSnake(cells, snake) {
    // loop through snake
    for (let segmentI = 0; segmentI < snake.length; segmentI++) {
        // loop through cells
        for (let cellsI = 0; cellsI < cells.length; cellsI++) {
            // if the cell matches the snake segment
            if (
                cells[cellsI].row === snake[segmentI].row &&
                cells[cellsI].col === snake[segmentI].col
            ) {
                // if its the last segment, it's the head
                if (segmentI === snake.length - 1) {
                    cells[cellsI].isHead = true;
                    return cells;
                    // otherwise, it's the tail
                } else {
                    cells[cellsI].isTail = true;
                }
            }
        }
    }
    return cells;
}

export function insertFood(cells, food) {
    let newCells = JSON.parse(JSON.stringify(cells));
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].row === food.row && cells[i].col === food.col) {
            newCells[i].isFood = true;
            return newCells;
        }
    }
}

export function getMiddle(board) {
    return {
        row: Math.ceil(board.width / 2),
        col: Math.ceil(board.height / 2),
    };
}

export function getRandomDirection() {
    const directions = ["UP", "DOWN", "LEFT", "RIGHT"];
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
}
