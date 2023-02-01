import React from "react";
import { Navigate } from "react-router-dom";
import io from "socket.io-client";
import "./WaitingRoom.css";
import MPGamepage from "./MPGamepage";
import MPGame from "../components/MPGame";

const socket = io(process.env.REACT_APP_SERVER_URL);

const JoinAddRoom = () => {
    const [roomId, setRoomId] = React.useState(null);
    const [joinRoomId, setJoinRoomId] = React.useState("");
    const [users, setUsers] = React.useState([]);
    // const [gameStarted, setGameStarted] = React.useState(false);
    const [copied, setCopied] = React.useState(false);
    const [cells, setCells] = React.useState(null);

    // emit "send key" on "kenydown"
    //   React.useEffect(() => {
    //     window.addEventListener("keydown", (e) => {
    //       socket.emit("send key", {key: e.key, roomId: roomId});
    //     });
    //     return () => {
    //       window.removeEventListener("keydown", (e) => {
    //         socket.emit("send key", {key: e.key, roomId: roomId});
    //       });
    //     };
    //   }, []);

    // Idk if this should go in a useEffect or not
    //   React.useEffect(() => {
    socket.on("user joined", (userId) => {
        setUsers([...users, userId]);
    });
    socket.on("game started", (cells) => {
        setCells(cells);
        // navigate("/MPgamepage");
    });
    // socket.on("room created", (id) => {
    //     setRoomId(id);
    // });
    socket.on("roomId", (id) => {
        setRoomId(id);
    });
    //   socket.on("received key", (key) => {
    //     console.log("received key:", key);
    //     setKeys((keys) => [...keys, key]);
    //   });
    //   }, [users, gameStarted, roomId]);

    const handleCreateRoom = () => {
        socket.emit("create room");
    };

    const handleJoinRoom = () => {
        socket.emit("join room", joinRoomId);
        Navigate();
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
            {/* {cells ? (
                <>
                    <p>Game started!</p>
                    <MPGamepage initialCells={cells} socket={socket} />
                </>
            ) : */}
            {roomId && (
                <>
                    <h1 onClick={copyRoomId}>
                        Room ID ({copied ? "Copied!" : "Click to copy"}):{" "}
                        {roomId}
                    </h1>
                    <h1>Users in room: {users.join(", ")}</h1>
                    <button onClick={handleStartGame}>Start Game</button>
                </>
            )}
            <>
                <button className='Create-room' onClick={handleCreateRoom}>Create Room</button>
                <br />
                <br />
                <h1>Or</h1>
                <br />
                <h1>
                    <h1 htmlFor="join-room-input">Enter Room ID:</h1>
                    <br />
                    <input
                        id="join-room-input"
                        type="text"
                        value={joinRoomId}
                        onChange={(e) => setJoinRoomId(e.target.value)}
                        style={{ marginTop: '0.5rem' }}
                    />
                </h1>
                <button
                    disabled={joinRoomId.length < 5}
                    onClick={handleJoinRoom}
                    className='join-room'
                >
                    Join Room
                </button>
            </>
            {/* )} */}
        </div>
    );
};

export default JoinAddRoom;
