import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import "../globalStyles.css";

const Navbar = ({ login, logout }) => {
    const navigate = useNavigate();
    const [user] = useState(""); //replace with context

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
                <button type="button" className="signIn" onClick={user ? logout : login}>
                    {user ? "Log Out" : "Sign In"}
                </button>
            </h2>
        </div>
    );
};

export default Navbar;
