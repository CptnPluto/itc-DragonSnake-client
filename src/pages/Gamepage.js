import React from "react";
import gameField from "../images/gameField.jpg";
import "./Gamepage.css";

import coin from "../images/coin.png";
import trophy from "../images/trophy.png";
import useAuthContext from "../hooks/useAuthContext";

const Gamepage = () => {
    const { user } = useAuthContext();
    console.log(user);

    return (
        // ALON - add your design here. I'll integrate it all together later.
        <div className="gamepage-container">
            <div
                className="sideList"
                style={{ border: "2px    solid #FFFFFF1C", borderRight: 0 }}
            >
                <h2>Now Online</h2>
            </div>

            <div
                className="mainRight"
                style={{ border: "2px solid #FFFFFF1C", borderBottom: 0 }}
            >
                <div className="topBar">
                    <h2>Score:</h2> <h2 className="bar-score">1200</h2>
                    <img src={trophy} className="bar-trophy" /> <h2>01</h2>
                    <img src={coin} className="bar-coin" /> <h2>04</h2>
                    {user && <p className="userName">{user.username}</p>}
                    <div className="userPic"></div>
                </div>

                <div className="gameField">
                    <img
                        src={gameField}
                        alt="gamePic"
                        className="gamePic"
                        style={{ border: " 6px solid #FFD600" }}
                    />
                </div>
            </div>
        </div>
    );
};

export default Gamepage;
