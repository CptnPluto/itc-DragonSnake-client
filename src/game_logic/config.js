const ROWS = 16;
const COLS = 26;
// BOARD SIZE (px) IN Game.css
export const INITIAL_DIRECTION = "RIGHT";
export const INITIAL_SPEED = 100;
export const INITIAL_SPEED_INCREASE = 100;
export const FPS = 70;
const cells = [];

for (let i = 0; i < ROWS; i++) {
    for (let j = 0; j < COLS; j++) {
        cells.push({
            row: i,
            col: j,
            isHead: false,
            isTail: false,
            isFood: false,
        });
    }
}

export const INITIAL_EMPTY_BOARD = {
    rows: ROWS,
    cols: COLS,
    cells: cells,
};
