import React, { useEffect, useState } from "react";
import "../components/Game.css";
import { getDirectionFromKeyboard } from "../game_logic/snake";

export default function MPGame({ initialCells, socket, roomId, playerNum }) {
  const [cells, setCells] = useState(initialCells);

  socket.on("cells", (cells) => {
    setCells(cells);
  });
  useEffect(() => {
    const handleKeyDown = (e) => {
      const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"];
      if (!arrowKeys.includes(e.key)) return;
      const directionEntered = getDirectionFromKeyboard(e.key);
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
