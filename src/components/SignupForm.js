import { useEffect, useState } from "react";
import "../globalStyles.css";

import useValidation from "../hooks/formValidation";
import useAuthContext from "../hooks/useAuthContext";

const SignupForm = (setUserAction) => {
    const [error, setError] = useState("");
    const [signupInfo, setSignupInfo] = useState({
        firstName: "default",
        lastName: "default",
        username: "",
        email: "",
        password: "",
        repassword: "",
    });
    const { username, password, repassword, email } = signupInfo;
    const isSignupInfoValid = username && password && repassword && email;
    const { signupFormValidation, valErrorMessage } = useValidation();
    const { dispatch, userSignup, errorMessage } = useAuthContext();

    const handleSignup = async (e) => {
        e.preventDefault();
        signupFormValidation(signupInfo);
        const res = await userSignup(signupInfo);
        if (res) {
            dispatch({ type: "CLICK_login", payload: "login" });
        }
    };

    const handleInputChange = (e) => {
        setSignupInfo({
            ...signupInfo,
            [e.target.name]: e.target.value,
        });
    };

    useEffect(() => {
        setError(errorMessage || valErrorMessage);
    }, [errorMessage, valErrorMessage]);

    return (
        <div className="authform">
            <h3>Signup</h3>
            <form onSubmit={handleSignup}>
                <label htmlFor="username">Username</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={signupInfo.username}
                    onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={signupInfo.email}
                    onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={signupInfo.password}
                    onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="repassword">Confirm Password</label>
                <input
                    type="password"
                    id="repassword"
                    name="repassword"
                    value={signupInfo.repassword}
                    onChange={(e) => handleInputChange(e)}
                />

                <button type="submit" disabled={!isSignupInfoValid}>
                    Signup
                </button>
            </form>
            <p className="error">{error}</p>
            <div className="switch">
                <p>Already have an account?</p>
                <button
                    type="button"
                    onClick={() => {
                        setUserAction("login");
                    }}
                >
                    Login!
                </button>
            </div>
        </div>
    );
};
export default SignupForm;
