import axios from "axios";
import { useState } from "react";

const useSignup = () => {
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
    return { signup, errorMessage };
};

export default useSignup;
