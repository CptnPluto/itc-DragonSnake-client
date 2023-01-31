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
const socket = connectToSocket();

// export default socket;
