import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

import "../globalStyles.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { login, logout, signup, user, setShow, setUserAction } =
        useAuthContext();

    const handleClick = async (action) => {
        await setUserAction(action);
        await setShow(true);
    };

    return (
        <div className="navbar">
            <img src="#" alt="logo" onClick={() => navigate("/")} />
            <h2 className="greeting">
                Welcome {user ? user.firstName : "Guest"}!
                {user && (
                    <button onClick={navigate("/profile")} type="button">
                        My Profile
                    </button>
                )}
                {!user && (
                    <button
                        className="signIn"
                        onClick={() => handleClick("signup")}
                        type="button"
                    >
                        Signup
                    </button>
                )}
                <button
                    type="button"
                    className="signIn"
                    onClick={
                        user
                            ? () => handleClick("logout")
                            : () => handleClick("login")
                    }
                >
                    {user ? "Log Out" : "Log In"}
                </button>
            </h2>
        </div>
    );
};

export default Navbar;
