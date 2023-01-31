import { createContext, useEffect, useReducer, useState } from "react";
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
            return { ...state, user: action.payload };
        case "LOGOUT":
            console.log("LOGOUT");
            return { ...state, user: null };
        case "SCORES":
            console.log("SCORES");
            return { ...state, scores: action.payload };
        case "TOPSCORE":
            console.log("TOPSCORE");
            return { ...state, topScore: action.payload };
        default:
            return state;
    }
};

const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null,
        userAction: "",
        scores: [],
        topScore: "",
    });
    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const userLogin = async (userCredentials) => {
        try {
            setLoading(true);
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/login`,
                userCredentials,
                { withCredentials: true }
            );
            setLoading(false);

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
            console.log(res);
            return res;
        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
        dispatch({ type: "SIGNUP" });
    };

    const userLogout = async () => {
        console.log("Logout method");
        try {
            const res = await axios.get(
                `${process.env.REACT_APP_SERVER_URL}/users/logout`,
                { withCredentials: true }
            );
            console.log(res);
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
                const res = await axios.get("http://localhost:8080/users", {
                    withCredentials: true,
                });
                const scores = await axios.get(
                    `http://localhost:8080/scores/${res.data.id}`,
                    {
                        withCredentials: true,
                    }
                );
                const topScore = await axios.get(
                    `http://localhost:8080/scores/high/${res.data.id}`,
                    {
                        withCredentials: true,
                    }
                );
                if (res.data.username) {
                    dispatch({ type: "LOGIN", payload: res.data });
                }
                if (scores.data) {
                    dispatch({ type: "SCORES", payload: scores.data });
                }
                if (topScore.data) {
                    dispatch({ type: "TOPSCORE", payload: topScore.data[0] });
                }

                console.log("Scores: ", scores.data);
            } catch (error) {
                console.log(error);
            }
        };
        checkUserLoggedIn();
    }, []);

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
