import { io } from "socket.io-client";
// const io = require("socket.io-client");

const socket = connectToSocket();

socket.on("init", handleInit);

socket.on("joined room", (id) => {
  console.log("joined room", id);
});

socket.on("roomId", handleRoomId);

socket.on("hello", (msg) => {
    console.log("hello from server", msg);
});

// socket.on("room created", (roomName) => {
//   console.log(`Room ${roomName} created`);
// });

let playerNumber;

function connectToSocket() {
  try {
    const socket = io("http://localhost:8080");
    console.log("connected to socket: ", socket);
    return socket;
  } catch (error) {
    return null;
  }
}

export function createRoom() {
  const res = socket.emit("create room");
  console.log("create room response (socket)", res);
}

export function joinRoom(roomId) {
  try {
    const res = socket.emit("join room", roomId);
    console.log("join response (socket)", res);
    console.log("start game!");
  } catch (error) {
    console.log("join error (socket)", error);
  }
}

export function sayHello() {
    socket.emit("hello", "hello from client");
}

function handleInit(num) {
  playerNumber = num;
  console.log("player number: ", playerNumber);
}

function handleRoomId(roomId) {
  console.log("Room ID: ", roomId);
}

export default socket;
