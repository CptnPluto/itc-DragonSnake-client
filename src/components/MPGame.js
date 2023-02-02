import React, { useEffect, useState } from "react";
import "../components/Game.css";
import { useSocket } from "../contexts/SocketContext";
import { getDirectionFromKeyboard } from "../game_logic/snake";
import eyes from "../images/eyes.png";
import wings from "../images/wings.png";

// export default function MPGame({ initialCells, socket, roomId, playerNum }) {
export default function MPGame({ initialCells, roomId, playerNum }) {
    const [cells, setCells] = useState(initialCells);
    const [snakeDir, setSnakeDir] = useState("RIGHT");
    const socket = useSocket();

    useEffect(() => {
        
        socket.on("cells", (cells) => {
            setCells(cells);
        });
        socket.on("direction", (direction) => {
            setSnakeDir(direction);
            });
    })
    useEffect(() => {
        const handleKeyDown = (e) => {
            const arrowKeys = [
                "ArrowUp",
                "ArrowDown",
                "ArrowLeft",
                "ArrowRight",
            ];
            if (!arrowKeys.includes(e.key)) return;
            const directionEntered = getDirectionFromKeyboard(e.key);
            setSnakeDir(directionEntered);
            socket.emit("direction", {
                directionEntered,
                playerRoomId: roomId,
                playerNum,
            });
        };
        document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="grid">
            {cells &&
                cells.map((cell) => {
                    return (
                        <div
                            key={
                                cell.row.toString() + "-" + cell.col.toString()
                            }
                            className={
                                cell.isHead
                                    ? ` is-head ${snakeDir}`
                                    : cell.isTail
                                    ? " is-tail"
                                    : cell.isFood
                                    ? " is-food"
                                    : "gridItem"
                            }
                        >
                            <>
                                {" "}
                                {cell.isHead ? (
                                    <div className={`eyes`}>
                                        <div className={`center`}>
                                            <img
                                                src={eyes}
                                                className={`center`}
                                            />
                                            <img
                                                src={wings}
                                                className={`center small-wings`}
                                            />
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
