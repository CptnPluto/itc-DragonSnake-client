import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";

const Homepage = () => {
    // To be replaced with values from context.
    const {user} = useAuthContext();

    return (
        <>
            {/* <button onClick={() => setUser(null)}>Temp Logout</button>
            <button
                onClick={() =>
                    setUser({
                        nickname: "GroovyTuesday",
                        scores: [1, 2, 3, 4, 5],
                    })
                }
            >
                Temp Login
            </button> */}
            {!user ? (
                <>
                    <div className="header">
                        <h2>Welcome to TotallyCoolName Snake Game!</h2>
                    </div>
                    <div className="main"></div>
                    <h3>Play the game here!</h3>
                    <h4>Instructions:</h4>
                    <div>
                        <p>
                            Use the arrow keys to move the snake around the
                            board.
                        </p>
                    </div>
                    <div className="footer">
                        <h5>Created by: TotallyCoolName</h5>
                    </div>
                </>
            ) : (
                <div className="header">
                    <h2>Welcome back, {user.nickname}!</h2>
                    <div className="scoreboard">
                        <h3>Scoreboard</h3>
                        <ul>
                            {user.scores.map((score, index) => (
                                <li key={index}>{score}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
            <div className="start_game">
                <button>Start Game</button>
            </div>

            {/* ALON - add your design here. I'll integrate it all together later. */}
        </>
    );
};

export default Homepage;
