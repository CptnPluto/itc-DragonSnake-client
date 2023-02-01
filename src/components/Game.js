import React, { useEffect, useState } from "react";
import "../components/Game.css";
import { insertFood, insertSnake } from "../game_logic/board";
import {
  INITIAL_DIRECTION,
  INITIAL_EMPTY_BOARD,
  INITIAL_SPEED,
} from "../game_logic/config.js";
import { getRandomFood, isFood } from "../game_logic/food";
import {
  checkSelfCollision,
  checkWallCollision,
  eat,
  getDirectionFromKeyboard,
  move,
} from "../game_logic/snake";

import useSound from "use-sound";
import coinSound from "../sounds/coin.mp3";

export default function Game({ increaseScore, handleLoss }) {
  let initialBoard = JSON.parse(JSON.stringify(INITIAL_EMPTY_BOARD));

  const initialSnake = [
    { row: 0, col: 0 },
    { row: 0, col: 1 },
    { row: 0, col: 2 },
  ];
  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(getRandomFood(initialBoard, initialSnake));
  const initialCells = initialBoard.cells;
  const [cells, setCells] = useState(initialCells);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);

  const [play] = useSound(coinSound, { volume: 0.4 });
  
  useEffect(() => {
    const handleKeyDown = (e) => {
      const directionEntered = getDirectionFromKeyboard(e.key);
      setDirection(directionEntered);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const localCells = JSON.parse(JSON.stringify(initialCells));
      insertFood(localCells, food);
      let localSnake = snake;

      if (isFood(snake, food)) {
        localSnake = eat(snake);
        increaseScore();
        const newFood = getRandomFood(initialBoard, snake);
        insertFood(localCells, newFood);
        setFood(newFood);
        play();
      }

      const newSnake = move(localSnake, direction);
      const newCells = insertSnake(localCells, newSnake);
      setCells(newCells);
      setSnake(newSnake);

      // die if needed
      // if collision: alert/popup, reset board, reset snake, reset direction
      if (
        checkWallCollision(snake, initialBoard) ||
        checkSelfCollision(snake)
      ) {
        handleLoss();
        clearInterval(interval);
        setSnake(initialSnake);
        return setCells(initialCells);
      }

      // reset board
      // setCells(initialCells);
    }, INITIAL_SPEED);

    return () => clearInterval(interval);
  }, [snake, direction, initialBoard, initialCells]);

  return (
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
  );
}
