import axios from "axios";
import { useState } from "react";
import useAuthContext from "./useAuthContext";

const useLogin = () => {
    const { dispatch } = useAuthContext();
    const [errorMessage, setErrorMessage] = useState("");

    const login = async (loginInfo) => {
        try {
            const res = await axios.post(
                `${process.env.REACT_APP_SERVER_URL}/users/login`,
                loginInfo,
                { withCredentials: true }
            );
           
            if (res.data.ok) {
                dispatch({ type: "LOGIN", payload: res.data.user });
            }

        } catch (err) {
            setErrorMessage("Login error: " + err.response.data);
        }
    };
    return { login, errorMessage };
};

export default useLogin;
