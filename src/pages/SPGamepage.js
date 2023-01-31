import React, { useState } from "react";
import axios from "axios";
import coin from "../images/coin.png";
import trophy from "../images/trophy.png";
import "./Gamepage.css";

import useAuthContext from "../hooks/useAuthContext";
import Game from "../components/Game";
import GameModal from "../components/GameModal";
import "../globalStyles.css";

const Gamepage = () => {
    const [active, setActive] = useState(false);
    const [message, setMessage] = useState("");
    const [scoreMessage, setScoreMessage] = useState("");
    const [score, setScore] = useState(0);
    const { user } = useAuthContext();
    const increaseScore = () => setScore((prevScore) => prevScore + 1);
    const resetScore = () => setScore(0);

    const postScore = async () => {
        const newScore = {
            date: new Date(),
            score: score,
            username: user.username,
        };
        console.log("NewScore : ", newScore);
        try {
            const res = await axios.post(
                "http://localhost:8080/scores",
                newScore,
                { withCredentials: true }
            );
            console.log("Respons: ", res);
        } catch (error) {
            console.log(error);
        }
    };

    const handleLoss = () => {
        setMessage("You lost! Try again?");
        setScoreMessage("Your score: " + score);
        postScore();
        setActive(false);
    };

    return (
        // ALON - add your design here. I'll integrate it all together later.
        <div className="gamepage-container">
            {!active && (
                <GameModal close={() => setActive(true)}>
                    <div className="message">{message}</div>
                    <div className="message">{scoreMessage}</div>
                    <button
                        onClick={() => {
                            resetScore();
                            setActive(true);
                        }}
                    >
                        Start Game!
                    </button>
                </GameModal>
            )}

            <div
                className="mainRight"
                style={{ border: "2px solid #FFFFFF1C", borderBottom: 0 }}
            >
                <div className="topBar">
                    <h2>Score:</h2> <h2 className="bar-score">{score}</h2>
                    <img src={trophy} className="bar-trophy" /> <h2>01</h2>
                    <img src={coin} className="bar-coin" /> <h2>04</h2>
                    <p className="userName">{user ? user.username : "Guest"}</p>
                    <div className="userPic"></div>
                </div>

                <div className="gameField">
                    {active && (
                        <Game
                            increaseScore={increaseScore}
                            handleLoss={handleLoss}
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Gamepage;
