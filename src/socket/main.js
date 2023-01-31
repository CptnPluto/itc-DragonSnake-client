// import { io } from "socket.io-client";
const io = require("socket.io-client");

function connectToSocket() {
  try {
    const socket = io("http://localhost:8080");
    console.log("connected to socket: ", socket);
    return socket;
  } catch (error) {
    return null;
  }
}

function joinRoom(socket, roomId) {
  try {
    const res = socket.emit("join", roomId);
    console.log("join response (socket)", res);
  } catch (error) {
    console.log("join error (socket)", error);
  }
}

socket.on("joined", (id) => {
  console.log("joined", id);
});

const socket = connectToSocket();

// export default socket;
