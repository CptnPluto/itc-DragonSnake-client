import React from "react";

const Lobby = ({ socket, roomId }) => {
    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    const handleStartGame = () => {
        socket.emit("start game", roomId);
    };

    return (
        <>
            <p onClick={copyRoomId}>
                Room ID ({copied ? "Copied!" : "Click to copy"}): {roomId}
            </p>
            <p>Users in room: {users.join(", ")}</p>
            <button onClick={handleStartGame}>Start Game</button>
        </>
    );
};

export default Lobby;
