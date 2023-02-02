import React, { useContext } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_SERVER_URL, {
  transports: ["websocket", "polling"],
  withCredentials: true,
});

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ children }) {
  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}
