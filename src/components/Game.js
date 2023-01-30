import React, { useState, useEffect } from "react";
import "../components/Game.css";
import {
  INITIAL_EMPTY_BOARD,
  INITIAL_DIRECTION,
  INITIAL_SPEED,
} from "../game_logic/config.js";
import { insertSnake } from "../game_logic/board";
import { move, checkWallCollision } from "../game_logic/snake";
import { setDirectionFromKeyboard } from "../game_logic/snake";

export default function Game() {
  let initialBoard = INITIAL_EMPTY_BOARD;
  console.log(initialBoard);
  const [snake, setSnake] = useState([
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ]);
  initialBoard = insertSnake(initialBoard, snake);
  const [board, setBoard] = useState(initialBoard);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);

  useEffect(() => {
    document.addEventListener(
      "keydown",
      setDirectionFromKeyboard(setDirection)
    );
  }, []);

  useEffect();
  setTimeout(() => {
    // move snake
    setSnake((prevSnake) => {
      const newSnake = move(prevSnake, direction);
      return newSnake;
    });
    // eat if needed
    // die if needed
    if (checkWallCollision(snake)) alert("Wall Collision");
  }, INITIAL_SPEED);
  console.log(board);
  return (
    <div className="game" onClick={console.log}>
      <div className="grid">
        {board.cells.map((grid) => {
          // console.log("grid", grid);
          return (
            <div
              key={grid.row.toString() + "-" + grid.col.toString()}
              className={
                grid.isHead
                  ? "gridItem is-head"
                  : grid.isTail
                  ? "gridItem is-tail"
                  : grid.isFood
                  ? "gridItem is-food"
                  : "gridItem"
              }
            ></div>
          );
        })}
      </div>
    </div>
  );
}
