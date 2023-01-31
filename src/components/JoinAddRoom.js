import React from "react";
// import { AuthContext } from "../contexts/AuthContext";
import { createRoom, joinRoom, sayHello } from "../socket/main";

const JoinAddRoom = () => {

  const [roomId, setRoomId] = React.useState("");

  return (
    <>
      <button onClick={createRoom}>open room</button>
      <button onClick={() => joinRoom(roomId)}>join room</button>
      <form>
        <input
          type="text"
          value={roomId}
          onChange={(e) => setRoomId(e.target.value)}
        />
      </form>
      <button onClick={sayHello}>Say Hello</button>
    </>
  );
};

export default JoinAddRoom;
