import axios from "axios";
import React, { useEffect, useState } from "react";
import coin from "../images/coin.png";
import trophy from "../images/trophy.png";
import userImg from "../images/userPic.png";
import "./Gamepage.css";

import Game from "../components/Game";
import GameModal from "../components/GameModal";
import "../globalStyles.css";
import useAuthContext from "../hooks/useAuthContext";

import useSound from "use-sound";
import loseSound from "../sounds/lose.mp3";
import music from "../sounds/music.mp3";

const Gamepage = () => {
  const [active, setActive] = useState(false);
  const [message, setMessage] = useState("");
  const [scoreMessage, setScoreMessage] = useState("");
  const [score, setScore] = useState(0);
  const [allScores, setAllScores] = useState([]);
  const [count, setCount] = useState(0);
  const DEFAULT_VOLUME = 0.1;
  const [volume, setVolume] = useState(DEFAULT_VOLUME);
  const { user, render, setRender } = useAuthContext();
  const [playLose] = useSound(loseSound, { volume: volume });
  const [play, { stop }] = useSound(music, { volume: volume });

  const startMusic = () => {
    play();
    setTimeout(() => {
      if (active) play();
    }, 147000);
  };

  const increaseScore = () => {
    switch (true) {
      case score < 30:
        setScore((prevScore) => prevScore + 10);
        break;
      case score > 100:
        setScore((prevScore) => prevScore + 20);
        break;
      case score > 500:
        setScore((prevScore) => prevScore + 50);
        break;
      case score > 3000:
        setScore((prevScore) => prevScore + 100);
        break;
      default:
        setScore((prevScore) => prevScore + 10);
    }

    setCount((prevCount) => prevCount + 1);
  };
  const resetScore = () => {
    setScore(0);
    setCount(0);
  };

  const postScore = async () => {
    const newScore = {
      date: new Date(),
      score: score,
      username: user.username,
    };
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/scores`,
        newScore,
        { withCredentials: true }
      );
    } catch (error) {
      console.log(error);
    }
    setRender(!render);
  };

  const handleLoss = () => {
    stop();
    setMessage("You lost! Try again?");
    setScoreMessage("Your score: " + score);
    postScore();
    setActive(false);
    playLose();
  };

  const getScores = async () => {
    try {
      const scores = await axios.get(
        `${process.env.REACT_APP_SERVER_URL}/scores`,
        { withCredentials: true }
      );
      setAllScores(scores.data);
      // console.log("Scores: ", scores.data);
      function compareScores(a, b) {
        if (a.score > b.score) {
          return -1;
        }
        if (a.score < b.score) {
          return 1;
        }
        return 0;
      }
      return scores.data.sort(compareScores);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const res = getScores();
  }, [render]);

  return (
    <div className="gamepage-container">
      <div
        className="sideList"
        style={{ border: "2px    solid #FFFFFF1C", borderRight: 0 }}
      >
        <h3>Leaderboard</h3>
        <ul className="scores">
          {allScores &&
            allScores.map((ele, index) => {
              return (
                <li key={index}>
                  <p>
                    {ele.username} : {ele.score}
                  </p>
                </li>
              );
            })}
        </ul>
      </div>

      <div
        className="mainRight"
        style={{ border: "2px solid #FFFFFF1C", borderBottom: 0 }}
      >
        {!active && (
          <GameModal
            close={() => {
              setActive(true);
            }}
          >
            <h1 className="message1">{message}</h1>
            <h2 className="message2">{scoreMessage}</h2>
            <button
              className="playBut1"
              onClick={() => {
                resetScore();
                setActive(true);
                startMusic();
              }}
            >
              Start Game!
            </button>
          </GameModal>
        )}
        <div className="topBar">
          <h2>Score:</h2> <h2 className="bar-score">{score}</h2>
          <img src={trophy} className="bar-trophy" /> <h2>01</h2>
          <img src={coin} className="bar-coin" /> <h2>{count}</h2>
          <p className="userName">{user ? user.username : "Guest"}</p>
          {/* <div className="userPic"> */}
          {/* // </div> */}
          <img src={userImg} className="userPic" />
          <button
            onClick={() => setVolume((vol) => (vol === 0 ? DEFAULT_VOLUME : 0))}
          >
            🎵 {volume === 0 ? "" : "X"}
          </button>
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
