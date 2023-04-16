import React from "react";
import useAuthContext from "../contexts/AuthContext";
import "../globalStyles.css";

const Profile = () => {
    const { topScore, scores, user } = useAuthContext();

    return (
        <div className="profile">
            <div className="title">
                <h1>Your Profile</h1>
            </div>
            <div className="username">
                <h2>User Name: {user.username}</h2>
            </div>
            <div className="scoreboard">
                <h3 className="topScore">Your Top Score</h3>
                <ul className="scores">
                    {topScore ? (
                        <li className="topScore">{topScore.score}</li>
                    ) : (
                        <li>No scores yet! Get playing!</li>
                    )}
                </ul>
                <div className="scores"></div>
            </div>
            <div className="scoreboard">
                <h3>Your Scoreboard</h3>
                <ul className="scores">
                    {scores &&
                        scores.map((ele, index) => {
                            return (
                                <li key={index}>
                                    <p>{ele.score} Shmuckarooms</p>
                                </li>
                            );
                        })}
                </ul>
            </div>
        </div>
    );
};

export default Profile;
