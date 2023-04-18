import { useEffect, useState } from "react";
import useAuthContext from "../contexts/AuthContext";
import "../globalStyles.css";

const LoginForm = () => {
    const [disabled, setDisabled] = useState(true);
    const [loginInfo, setLoginInfo] = useState({
        email: "",
        firstName: "",
        lastName: "",
        password: "",
    });
    const { setShow, userLogin, errorMessage, setUserAction } = useAuthContext();

    const handleLogin = async (e) => {
        e.preventDefault();
        const res = await userLogin(loginInfo);
        if (res) {
            setShow(false);
        }
    };

    const handleInputChange = (e) => {
        setLoginInfo({
            ...loginInfo,
            [e.target.name]: e.target.value,
        });
    };

    // Enable submit if all fields have entries.
    useEffect(() => {
        const enableSubmit = () => {
            if (loginInfo.email && loginInfo.password) {
                setDisabled(false);
            } else {
                setDisabled(true);
            }
        };
        enableSubmit();
    }, [loginInfo]);

    return (
        <div className="authform">
            <h3>Login</h3>
            <form onSubmit={handleLogin}>
                <label htmlFor="email">Email</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginInfo.email}
                    onChange={(e) => handleInputChange(e)}
                />
                <label htmlFor="password">Password</label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginInfo.password}
                    onChange={(e) => handleInputChange(e)}
                />

                <button type="submit" disabled={disabled}>
                    Login
                </button>
            </form>
            <p className="error">{errorMessage}</p>
            <div className="switch">
                <p>Not yet a member?</p>
                <button
                    type="button"
                    onClick={() =>
                        setUserAction("signup")
                    }
                >
                    Sign Up!
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
