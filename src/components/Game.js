import React, { useCallback, useEffect, useState } from "react";
import "../components/Game.css";
import eyes from "../images/eyes.png";
import wings from "../images/wings.png";

import { insertFood, insertSnake } from "../game_logic/board";
import {
  INITIAL_CELLS,
  INITIAL_DIRECTION,
  INITIAL_EMPTY_BOARD,
  INITIAL_SNAKE,
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
  let initialCells = JSON.parse(JSON.stringify(INITIAL_CELLS));
  let initialSnake = JSON.parse(JSON.stringify(INITIAL_SNAKE));

  const [snake, setSnake] = useState(initialSnake);
  const [food, setFood] = useState(getRandomFood(initialBoard, initialSnake));
  const [speed, setSpeed] = useState(INITIAL_SPEED);
  const [cells, setCells] = useState(initialCells);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);

  const [wingsSize, setWingsSize] = useState("no-wings");

  const [playCoinSound] = useSound(coinSound, { volume: 0.02 });

  const increaseSpeed = () => {
    if (speed > 50) {
      setSpeed(speed - 1);
    } else {
      setSpeed(50);
    }
  };

  const updateWingSize = () => {
    if (snake.length > 3) {
      setWingsSize("small-wings");
    }
    if (snake.length > 5) {
      setWingsSize("med-wings");
    }
    if (snake.length > 8) {
      setWingsSize("big-wings");
    }
  };

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
      const movedSnake = move(snake, direction);
      if (isFood(movedSnake, food)) {
        const fedSnake = eat(movedSnake);
        setSnake(fedSnake);
        const newFood = getRandomFood(initialBoard, snake);
        setFood(newFood);
        playCoinSound();
        increaseScore();
        increaseSpeed();
        updateWingSize();
      } else {
        setSnake(movedSnake);
      }

      const cellsWithMovedSnake = insertSnake(initialCells, snake);
      const cellsWithMovedSnakeAndFood = insertFood(cellsWithMovedSnake, food);
      setCells(cellsWithMovedSnakeAndFood);

      if (
        checkWallCollision(snake, initialBoard) ||
        checkSelfCollision(snake)
      ) {
        handleLoss();
        clearInterval(interval);
        setSnake(initialSnake);
        return setCells(initialCells);
      }
    }, speed);

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
                ? `is-head  ${direction}`
                : cell.isTail
                ? "is-tail"
                : cell.isFood
                ? "is-food"
                : "gridItem"
            }
          >
            <>
              {" "}
              {cell.isHead ? (
                <div className={`eyes`}>
                  <div className={`center`}>
                    <img src={eyes} className={`center`} />
                    <img src={wings} className={`center ${wingsSize}`} />
                  </div>
                </div>
              ) : (
                ""
              )}
            </>
          </div>
        );
      })}
    </div>
  );
}
