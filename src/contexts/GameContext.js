import { createContext } from "react";

const GameContext = createContext();

const gameReducer = (state, action) => {
    switch (action.type) {
    }
};

const GameContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(gameReducer, {
        user: null,
        board: null,
    });
};

return <GameContext.Provider value={{}}>{children}</GameContext.Provider>;
