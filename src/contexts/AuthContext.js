import { createContext, useReducer, useState } from "react";
// import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGNUP":
            console.log("SIGNUP");
            break;
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
    const [show, setShow] = useState(false);

    const login = async (userCredentials) => {
        console.log("Login method");
        dispatch({ type: "LOGIN", payload: { user: userCredentials } });
    };

    const logout = async () => {
        console.log("Logout method");
        dispatch({ type: "LOGOUT" });
    };

    const signup = async () => {
        console.log("Signup method");
        dispatch({ type: "SIGNUP" });
    };

    return (
        <AuthContext.Provider
            value={{ ...state, dispatch, signup, login, logout, show, setShow }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
