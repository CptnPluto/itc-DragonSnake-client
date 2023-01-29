import axios from "axios";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useSignup = () => {
    const { dispatch } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState("");

    const signup = async (signupInfo) => {
        try {
            await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/signup`,
                signupInfo
            );
        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
    };

    const tempSignup = () => {
        dispatch({
            type: "SIGNUP",
            payload: {
                nickname: "GroovyTuesday",
                scores: [1, 2, 3, 4, 5],
            },
        });
    };

    return { tempSignup, signup, errorMessage };
};

export default useSignup;
