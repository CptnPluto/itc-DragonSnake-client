import React, { useEffect, useState } from "react";
import "../components/Game.css";
import { insertSnake, insertFood } from "../game_logic/board";
import {
    INITIAL_DIRECTION,
    INITIAL_EMPTY_BOARD,
    INITIAL_SPEED,
} from "../game_logic/config.js";
import {
    checkWallCollision,
    eat,
    move,
    setDirectionFromKeyboard,
} from "../game_logic/snake";
import { getRandomFood, isFood } from "../game_logic/food";

export default function Game() {
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

    useEffect(() => {
        document.addEventListener(
            "keydown",
            setDirectionFromKeyboard(setDirection)
        );
        return () =>
            document.removeEventListener(
                "keydown",
                setDirectionFromKeyboard(setDirection)
            );
    }, []);

    useEffect(() => {
        const interval = setInterval(() => {
            const localCells = JSON.parse(JSON.stringify(initialCells));
            insertFood(localCells, food);

            if (isFood(snake, food)) {
                eat(snake);
                const newFood = getRandomFood(initialBoard, snake);
                insertFood(localCells, newFood);
                setFood(newFood);
            }

            const newSnake = move(snake, direction);
            const newCells = insertSnake(localCells, newSnake);
            setCells(newCells);
            setSnake(newSnake);

            // die if needed
            if (checkWallCollision(snake, initialBoard)) {
                alert("Wall Collision");
                clearInterval(interval);
                console.log("initialBoard", initialBoard);
                setSnake(initialSnake);
                return setCells(initialCells);
            }
            // reset board
            // setCells(initialCells);
        }, INITIAL_SPEED);

        return () => clearInterval(interval);
    }, [snake, direction, initialBoard, initialCells]);

    return (
        <div className="game">
            <div className="grid">
                {cells.map((cell) => {
                    return (
                        <div
                            key={
                                cell.row.toString() + "-" + cell.col.toString()
                            }
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
