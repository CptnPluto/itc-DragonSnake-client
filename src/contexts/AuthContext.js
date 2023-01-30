import { createContext, useReducer, useState, useCallback, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "CLICK_signup":
            console.log("Clicked signup button");
            return { ...state, userAction: action.payload };
        case "CLICK_login":
            console.log("Clicked login button");
            return { ...state, userAction: action.payload };
        case "SIGNUP":
            console.log("SIGNUP");
            break;
        case "LOGIN":
            console.log("LOGIN");
            console.log("Payload: ", action.payload);
            return { ...state, user: action.payload };
        case "LOGOUT":
            console.log("LOGOUT");
            return { ...state, user: null };
        default:
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        userAction: "",
    });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const userLogin = useCallback(async (userCredentials) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/login`,
                userCredentials,
                { withCredentials: true }
            );

            if (res.data) {
                dispatch({ type: "LOGIN", payload: res.data });
            }
        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
    }, []);

    const userSignup = useCallback(async (userCredentials) => {
        console.log("Signup method");
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/signup`,
                userCredentials
            );
            console.log(res);
            return res;
        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
        dispatch({ type: "SIGNUP" });
    }, []);

    const userLogout = useCallback(async () => {
        console.log("Logout method");
        dispatch({ type: "LOGOUT" });
    }, []);

    useEffect(() => {
        console.log("Need to get user state from BE");
    }, [state]);

    return (
        <AuthContext.Provider
            value={{
                ...state,
                dispatch,
                userSignup,
                userLogin,
                userLogout,
                show,
                setShow,
                errorMessage,
                loading,
                setLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
