import { createContext, useReducer } from "react";
// import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "LOGIN":
            console.log("LOGIN");
            break;
        case "LOGOUT":
            console.log("LOGOUT");
            break;
        default:
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
    });

    const login = async (userCredentials) => {
        console.log("Login method");
        dispatch({ type: "LOGIN", payload: { user: userCredentials } });
    };

    const logout = async () => {
        console.log("Logout method");
        dispatch({ type: "LOGOUT" });
    };

    return (
        <AuthContext.Provider value={{ ...state, dispatch, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
