import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";
import logo from "../images/logo.svg";
import "../globalStyles.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { user, setShow, dispatch } = useAuthContext();

    const handleClick = async (action) => {
        if (action === "logout") {
            return dispatch({ type: "LOGOUT" });
        }
        dispatch({ type: `CLICK_${action}`, payload: `${action}` });
        await setShow(true);
    };

    return (
        <div className="navbar">
            <img src={logo} alt="logo" onClick={() => navigate("/")} />
            <h2 className="greeting">
                Welcome {user ? user.username : "Guest"}!
                {user && (
                    <button
                        className="signIn"
                        onClick={() => navigate("/profile")}
                        type="button"
                    >
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
