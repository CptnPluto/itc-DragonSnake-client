import axios from "axios";
import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useState,
} from "react";

const AuthContext = createContext();

const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw Error("useAuthContext must be within an AuthContextProvider");
    }

    return context;
};

export default useAuthContext;

const authReducer = (state, action) => {
    switch (action.type) {
        case "SIGNUP":
            break;
        case "LOGIN":
            return { ...state, user: action.payload };
        case "LOGOUT":
            return { ...state, user: null };
        case "AUTH_IS_READY":
            return { ...state, authIsReady: true };
        case "SCORES":
            return { ...state, scores: action.payload };
        case "TOPSCORE":
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
    const [errorMessage, setErrorMessage] = useState("");

    const userLogin = async (userCredentials) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/login`,
                userCredentials,
                { withCredentials: true }
            );
            console.log("data: ", res);
            if (res.data) {
                dispatch({ type: "LOGIN", payload: res.data.user });
            }
            return res.data;
        } catch (err) {
            setErrorMessage("Whoops! Something went wrong! Try again.");
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

    //Gets current user state
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
                setErrorMessage,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthContextProvider };
