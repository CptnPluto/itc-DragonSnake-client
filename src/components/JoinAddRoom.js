import React from "react";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:8080";
const socket = io(SERVER_URL);

const JoinAddRoom = () => {
    const [roomId, setRoomId] = React.useState(null);
    const [joinRoomId, setJoinRoomId] = React.useState("");
    const [users, setUsers] = React.useState([]);
    const [gameStarted, setGameStarted] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const [keys, setKeys] = React.useState([]);

    // emit "send key" on "kenydown"
    React.useEffect(() => {
        window.addEventListener("keydown", (e) => {
            if (roomId) {
                socket.emit("send key", {
                    key: e.key,
                    roomId: roomId,
                    str: "string1",
                    str2: "string2",
                });
            }
        });
        return () => {
            window.removeEventListener("keydown", (e) => {
                socket.emit("send key", e.key);
            });
        };
    }, [roomId]);

    // Idk if this should go in a useEffect or not
    //   React.useEffect(() => {
    socket.on("user joined", (userId) => {
        setUsers([...users, userId]);
    });
    socket.on("game started", () => {
        setGameStarted(true);
    });
    socket.on("room created", (id) => {
        setRoomId(id);
    });
    socket.on("roomId", (id) => {
        setRoomId(id);
    });
    socket.on("received key", (key) => {
        console.log("received key:", key);
        // setKeys((keys) => [...keys, key]);
    });
    //   }, [users, gameStarted, roomId]);

    const handleCreateRoom = () => {
        socket.emit("create room");
    };

    const handleJoinRoom = () => {
        socket.emit("join room", joinRoomId);
    };

    const handleStartGame = () => {
        socket.emit("start game", roomId);
    };

    const copyRoomId = () => {
        navigator.clipboard.writeText(roomId);
        setCopied(true);
        setTimeout(() => {
            setCopied(false);
        }, 1000);
    };

    return (
        <div style={{ textAlign: "center" }}>
            {gameStarted ? (
                <>
                    <p>Game started!</p>
                    {keys.map((key) => (
                        <p key={crypto.randomUUID()}>{key}</p>
                    ))}
                </>
            ) : roomId ? (
                <>
                    <p onClick={copyRoomId}>
                        Room ID ({copied ? "Copied!" : "Click to copy"}):{" "}
                        {roomId}
                    </p>
                    <p>Users in room: {users.join(", ")}</p>
                    <button onClick={handleStartGame}>Start Game</button>
                </>
            ) : (
                <>
                    <button onClick={handleCreateRoom}>Create Room</button>
                    <br />
                    <br />
                    <p>Or</p>
                    <br />
                    <p>
                        <label htmlFor="join-room-input">Enter Room ID:</label>
                        <br />
                        <input
                            id="join-room-input"
                            type="text"
                            value={joinRoomId}
                            onChange={(e) => setJoinRoomId(e.target.value)}
                        />
                    </p>
                    <button
                        disabled={joinRoomId.length < 5}
                        onClick={handleJoinRoom}
                    >
                        Join Room
                    </button>
                </>
            )}
        </div>
    );
};

export default JoinAddRoom;
