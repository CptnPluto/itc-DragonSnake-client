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
            console.log("action.payload: ", action.payload);
            return { ...state, user: action.payload };
            break;
        case "LOGOUT":
            console.log("LOGOUT");
            return { ...state, user: null };
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
    const [userAction, setUserAction] = useState("");

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
            value={{
                ...state,
                dispatch,
                signup,
                login,
                logout,
                show,
                setShow,
                setUserAction,
                userAction,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
