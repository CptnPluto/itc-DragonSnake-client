import React, { useEffect, useState } from "react";
import "../components/Game.css";
import { insertSnake } from "../game_logic/board";
import {
  INITIAL_DIRECTION,
  INITIAL_EMPTY_BOARD,
  INITIAL_SPEED,
} from "../game_logic/config.js";
import {
  checkWallCollision,
  move,
  setDirectionFromKeyboard,
} from "../game_logic/snake";

export default function Game() {
  let initialBoard = INITIAL_EMPTY_BOARD;
  const initialSnake = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ];
  const [snake, setSnake] = useState(initialSnake);
  const initialCells = initialBoard.cells;
  const initialCellsWithSnake = insertSnake(initialBoard.cells, snake);
  const [cells, setCells] = useState(initialCellsWithSnake);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);

  useEffect(() => {
    document.addEventListener(
      "keydown",
      setDirectionFromKeyboard(setDirection)
    );
  }, []);
  useEffect(() => {
    const interval = setInterval(() => {
      // move snake
      setSnake((prevSnake) => {
        const newSnake = move(prevSnake, direction);
        return newSnake;
      });
      // eat if needed
      // die if needed
      if (checkWallCollision(snake, initialBoard)) {
        alert("Wall Collision");
        clearInterval(interval);
        console.log("initialBoard", initialBoard);
        setSnake(initialSnake);
        return setCells(initialCells);
      }
      // reset board
      setCells(initialCells);
    }, INITIAL_SPEED);

    return () => clearInterval(interval);
  }, [snake, direction, initialBoard, initialCells]);

  return (
    <div className="game">
      <div className="grid">
        {cells.map((cell) => {
          return (
            <div
              key={cell.row.toString() + "-" + cell.col.toString()}
              className={
                cell.isHead
                  ? "gridItem is-head"
                  : cell.isTail
                  ? "gridItem is-tail"
                  : cell.isFood
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
