import { useState } from "react";
import useAuthContext from "../hooks/useAuthContext";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import bigSnake from "../images/bigSnake.png";

const Homepage = () => {
    // To be replaced with values from context.
    const {user} = useAuthContext();
    const navigate = useNavigate();

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
                
 <div className="Homepage-container">       

<div className="leftBox">
        <div className="leftBoxTexts">
        <span>The</span><h1> Dragon Snake  </h1>
        <h2>Find out who is the best player!</h2>
        <p> Use the arrow keys to move the Dragon Snake around the
        board. Collect as many coins as possible and win prizes</p>
        <div className="start_game  ">
        <button className="playBut1 mr-15" onClick={()=> navigate("/gamepage")}>Multiplayer</button>
        <button className="playBut1"  onClick={()=> navigate("/sp_gamepage")}>Singleplayer</button>
        </div>
        </div>
</div>  


<div className="rightBox">
        <img src={bigSnake} className="bigSnakePic"/>
</div> 

</div> {/* //Homepage-container */}

                    {/* <div className="main"></div>
                    <div>
                    </div> */}
                    {/* <div className="footer"> */}
                    {/* </div> */}
                </>
            ) : (
                <div className="header">
                    <h2>Welcome back, {user.username}!</h2>
                    <div className="scoreboard">
                        <h3>Scoreboard</h3>
                        <ul>
                            {user.scores && user.scores.map((score, index) => (
                                <li key={index}>{score}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}

            
          

            <p className="CreatedBy">Created by: Avraham Schochet, Dahvid NessAiver, Alon Kerklies, Yair Rosenschein & Zachary Ebenfeld</p>
        </>
    );
};

export default Homepage;
