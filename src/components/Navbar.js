import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

import "../globalStyles.css";

const Navbar = () => {
    const navigate = useNavigate();
    const { login, logout, signup, user } = useAuthContext();

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
                    <button className= "signIn" onClick={signup} type="button">Signup</button>
                )}
                <button
                    type="button"
                    className="signIn"
                    onClick={user ? logout : login}
                >
                    {user ? "Log Out" : "Sign In"}
                </button>
            </h2>
        </div>
    );
};

export default Navbar;
