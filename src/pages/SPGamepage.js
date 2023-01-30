import React from "react";
import "./Gamepage.css";
import gameField from "../images/gameField.jpg";
import coin from "../images/coin.png";
import trophy from "../images/trophy.png";


const Gamepage = () => {
    return (
        // ALON - add your design here. I'll integrate it all together later.
        <div className="gamepage-container">
            

            <div className="mainRight" style={{ border: "2px solid #FFFFFF1C", borderBottom: 0 }}>
                <div className="topBar">  
                <h2 >Score:</h2> <h2 className="bar-score" >1200</h2>
                <img src={trophy} className="bar-trophy"/> <h2>01</h2>
                <img src={coin} className="bar-coin"/> <h2>04</h2>

                    <p className="userName">userName</p>
                    <div className="userPic"></div>
                </div>

                <div className="gameField">
                <img src={gameField} alt="gamePic" className="gamePic" style={{ border: " 6px solid #FFD600"  }}/>
                </div>
            </div>
        </div>
    );
};

export default Gamepage;
