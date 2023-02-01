import { createContext, useEffect, useReducer, useState } from "react";
import axios from "axios";

const AuthContext = createContext();

const authReducer = (state, action) => {
    switch (action.type) {
        case "CLICK_signup":
            // console.log("Clicked signup button");
            return { ...state, userAction: action.payload };
        case "CLICK_login":
            // console.log("Clicked login button");
            return { ...state, userAction: action.payload };
        case "SIGNUP":
            // console.log("SIGNUP");
            break;
        case "LOGIN":
            // console.log("LOGIN");
            return { ...state, user: action.payload };
        case "LOGOUT":
            // console.log("LOGOUT");
            return { ...state, user: null };
        case "AUTH_IS_READY":
            // console.log("AUTH_IS_READY");
            return { ...state, authIsReady: true };
        case "SCORES":
            console.log("SCORES");
            return { ...state, scores: action.payload };
        case "TOPSCORE":
            // console.log("TOPSCORE");
            return { ...state, topScore: action.payload };
        default:
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        userAction: "",
        scores: "",
        topScore: "",
        authIsReady: false,
    });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [render, setRender] = useState(false);

    const userLogin = async (userCredentials) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/login`,
                userCredentials,
                { withCredentials: true }
            );

            if (res.data) {
                dispatch({ type: "LOGIN", payload: res.data });
            }
        } catch (error) {
            console.log(error);
        }
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/login`,
                userCredentials,
                { withCredentials: true }
            );

            if (res.data.ok) {
                dispatch({ type: "LOGIN", payload: res.data.user });
            }
            setRender(!render);
        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
    };

    const userSignup = async (userCredentials) => {
        console.log("Signup method");
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/signup`,
                userCredentials
            );
            return res;
        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
        dispatch({ type: "SIGNUP" });
    };

    const userLogout = async () => {
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/users/logout`,
                { withCredentials: true }
            );
            if (res.data.ok) {
                dispatch({ type: "LOGOUT" });
            }
        } catch (err) {
            setErrorMessage("Logout error: " + err.response.data);
        }
    };

    useEffect(() => {
        const checkUserLoggedIn = async () => {
            try {
                setLoading(true);
                const auth = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/users`,
                    {
                        withCredentials: true,
                    }
                );
                // setLoading(false);
                const scores = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/scores/${auth.data.id}`,
                    {
                        withCredentials: true,
                    }
                );
                const topScore = await axios.get(
                    `${process.env.REACT_APP_SERVER_URL}/scores/high/${auth.data.id}`,
                    {
                        withCredentials: true,
                    }
                );
                if (auth.data.username) {
                    dispatch({ type: "LOGIN", payload: auth.data });
                }
                if (scores.data) {
                    dispatch({
                        type: "SCORES",
                        payload: scores.data.reverse(),
                    });
                }
                if (topScore.data) {
                    dispatch({ type: "TOPSCORE", payload: topScore.data[0] });
                }
                dispatch({ type: "AUTH_IS_READY" });
            } catch (error) {
                console.log(error);
                dispatch({ type: "AUTH_IS_READY" });
            }
        };
        checkUserLoggedIn();
    }, [render]);

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
                render,
                setRender,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
