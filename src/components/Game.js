import React, { useEffect, useState } from "react";
import "../components/Game.css";
import eyes from "../images/eyes.png";
import wings from "../images/wings.png";

import { insertFood, insertSnake } from "../game_logic/board";
import {
  INITIAL_DIRECTION,
  INITIAL_EMPTY_BOARD,
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
  const [speed, setSpeed] = useState(100);
  const initialCells = initialBoard.cells;
  const [cells, setCells] = useState(initialCells);
  const [direction, setDirection] = useState(INITIAL_DIRECTION);

  const [wingsSize, setWingsSize] = useState("no-wings");

  const [play] = useSound(coinSound, { volume: 0.1 });

  const increaseSpeed = () => {
    if (speed > 50) {
      setSpeed(speed - 1);
    } else {
      setSpeed(50);
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
      const localCells = JSON.parse(JSON.stringify(initialCells));
      insertFood(localCells, food);
      let localSnake = snake;

      if (isFood(snake, food)) {
        localSnake = eat(snake);
        increaseScore();
        increaseSpeed();
        const newFood = getRandomFood(initialBoard, snake);
        insertFood(localCells, newFood);
        setFood(newFood);
        play();
      }

      const newSnake = move(localSnake, direction);
      const newCells = insertSnake(localCells, newSnake);
      setCells(newCells);
      setSnake(newSnake);

      if (newSnake.length > 3) {
        setWingsSize("small-wings");
      }
      if (newSnake.length > 5) {
        setWingsSize("med-wings");
      }
      if (newSnake.length > 8) {
        setWingsSize("big-wings");
      }

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
