import { NavLink } from "react-router-dom";
import "../globalStyles.css";
import useAuthContext from "../hooks/useAuthContext";
import logo from "../images/logo.svg";

const Navbar = () => {
    const { user, setShow, dispatch, userLogout } = useAuthContext();

    const handleClick = async (action) => {
        if (action === "logout") {
            await userLogout();
            return dispatch({ type: "LOGOUT" });
        }
        dispatch({ type: `CLICK_${action}`, payload: `${action}` });
        setShow(true);
    };

    return (
        <div className="navbar">
            <NavLink to="/">
                <img src={logo} alt="DragonSnake" className="logo" />
            </NavLink>
            <p className="greeting">
                Welcome {user ? user.username : "Guest"}!
                {user && (
                    <NavLink className="playBut1" to="/profile" type="button">
                        My Profile
                    </NavLink>
                )}
                <button
                    type="button"
                    className="playBut1"
                    onClick={
                        user
                            ? () => handleClick("logout")
                            : () => handleClick("login")
                    }
                >
                    {user ? "Log Out" : "Log In"}
                </button>
                {!user && (
                    <button
                        className="signIn"
                        onClick={() => handleClick("signup")}
                        type="button"
                    >
                        Signup
                    </button>
                )}
            </p>
        </div>
    );
};

export default Navbar;
