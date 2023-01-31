import React, { useState } from "react";
import coin from "../images/coin.png";
import trophy from "../images/trophy.png";
import "./Gamepage.css";

import Game from "../components/Game";
import GameModal from "../components/GameModal";
import "../globalStyles.css";

const Gamepage = () => {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [score, setScore] = useState(0);
  const increaseScore = () => setScore((prevScore) => prevScore + 1);
  const resetScore = () => setScore(0);

  const handleLoss = () => {
    setMessage("You lost! Try again?");
    setActive(false);
  };

  return (
    // ALON - add your design here. I'll integrate it all together later.
    <div className="gamepage-container">
      {!active && (
        <GameModal close={() => setActive(true)}>
          <div className="message">{message}</div>
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
          <p className="userName">userName</p>
          <div className="userPic"></div>
        </div>

        <div className="gameField">
          {active && (
            <Game increaseScore={increaseScore} handleLoss={handleLoss} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Gamepage;
