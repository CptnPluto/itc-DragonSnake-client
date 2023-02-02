import React, { useContext, useState } from "react";

const PlayerContext = React.createContext();

export function usePlayer() {
  return useContext(PlayerContext);
}

export function PlayerProvider({ children }) {
    const [playerNum, setPlayerNum] = useState(null);
    const [roomId, setRoomId] = useState(null);
  return (
    <PlayerContext.Provider value={{ playerNum, setPlayerNum, roomId, setRoomId }}>
      {children}
    </PlayerContext.Provider>
  );
}
