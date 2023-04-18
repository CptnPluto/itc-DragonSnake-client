import React, { startTransition, useEffect, useState } from "react";
import axios from "axios";
import coin from "../images/coin.png";
import trophy from "../images/trophy.png";
import userImg from "../images/userPic.png";
import "./Gamepage.css";

import Game from "../components/Game";
import GameModal from "../components/GameModal";
import "../globalStyles.css";

import useSound from "use-sound";
import music from "../sounds/music.mp3";
import MPGame from "../components/MPGame";
import { useSocket } from "../contexts/SocketContext";
import { usePlayer } from "../contexts/PlayerContext";

const MPGamepage = ({handleStartGame}) => {
// const MPGamepage = ({ socket, initialCells, playerNum, roomId }) => {
  const {playerNum, roomId} = usePlayer();
    const [active, setActive] = useState(true);
  const [message, setMessage] = useState("");
  const socket = useSocket();
  const [initialCells, setInitialCells] = useState([]);
  // useEffect(() => {
    socket.on("game started", (cells) => {
      setActive(true);
      setInitialCells(cells);
    });
  
  socket.on("win", (winner) => {
    setActive(false);
    setMessage(`Player ${winner} wins!`);
  });
  // }, [socket]);
  //   const [scoreMessage, setScoreMessage] = useState("");
  //   const [score, setScore] = useState(0);
  //   const [allScores, setAllScores] = useState([]);
  //   const [count, setCount] = useState(0);
  //   const { user, render, setRender } = useAuthContext();
  //   const [play, { stop }] = useSound(music);

  //   const startMusic = () => {
  //     play();
  //     setTimeout(() => {
  //       if (active) play();
  //     }, 147000);
  //   };

  //   const increaseScore = () => {
  //     switch (true) {
  //       case score < 30:
  //         setScore((prevScore) => prevScore + 10);
  //         break;
  //       case score > 100:
  //         setScore((prevScore) => prevScore + 20);
  //         break;
  //       case score > 500:
  //         setScore((prevScore) => prevScore + 50);
  //         break;
  //       case score > 3000:
  //         setScore((prevScore) => prevScore + 100);
  //         break;
  //       default:
  //         setScore((prevScore) => prevScore + 10);
  //     }

  //     setCount((prevCount) => prevCount + 1);
  //   };
  //   const resetScore = () => {
  //     setScore(0);
  //     setCount(0);
  //   };

  //   const postScore = async () => {
  //     const newScore = {
  //       date: new Date(),
  //       score: score,
  //       username: user.username,
  //     };
  //     try {
  //       const res = await axios.post(
  //         `${process.env.REACT_APP_SERVER_URL}/scores`,
  //         newScore,
  //         { withCredentials: true }
  //       );
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setRender(!render);
  //   };

    const handleLoss = () => {
      setMessage("You lost! Try again?");
      // setScoreMessage("Your score: " + score);
      // postScore();
      setActive(false);
      // stop();
    };

  //   const getScores = async () => {
  //     try {
  //       const scores = await axios.get(
  //         `${process.env.REACT_APP_SERVER_URL}/scores`,
  //         { withCredentials: true }
  //       );
  //       setAllScores(scores.data);
  //       console.log("Scores: ", scores.data);
  //       function compareScores(a, b) {
  //         if (a.score > b.score) {
  //           return -1;
  //         }
  //         if (a.score < b.score) {
  //           return 1;
  //         }
  //         return 0;
  //       }
  //       return scores.data.sort(compareScores);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   useEffect(() => {
  //     const res = getScores();
  //   }, [render]);

  return (
    <div className="gamepage-container">
      {/* <div
        className="sideList"
        style={{ border: "2px    solid #FFFFFF1C", borderRight: 0 }}
      >
        <h2>Leaderboard</h2>
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
      </div> */}

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
            <div className="message">{message}</div>
            {/* <div className="message score">{scoreMessage}</div> */}
            <button
              onClick={() => {
                // resetScore();
                handleStartGame()
                setActive(true);
                // startMusic();
              }}
            >
              Play again?
            </button>
          </GameModal>
        )}
        <div className="topBar">
          {/* <h2>Score:</h2> <h2 className="bar-score">{score}</h2>
          <img src={trophy} className="bar-trophy" /> <h2>01</h2>
          <img src={coin} className="bar-coin" /> <h2>{count}</h2>
          <p className="userName">{user ? user.username : "Guest"}</p> */}
          {/* <div className="userPic"> */}
          {/* // </div> */}
          <img src={userImg} className="userPic" />
        </div>

        <div className="gameField">
          <MPGame
            initialCells={initialCells}
            // socket={socket}
            roomId={roomId}
            playerNum={playerNum}
          />
        </div>
      </div>
    </div>
  );
};

export default MPGamepage;
