import useAuthContext from "../hooks/useAuthContext";
import axios from "axios";

const Homepage = () => {
    // To be replaced with values from context.
    const { user } = useAuthContext();
    // user.scores ? console.log(user.scores) : console.log("No scores yet!");
    console.log(user);

    const handleTest = async () => {
        try {
            const res = await axios.get("http://localhost:8080/scores", {
                withCredentials: true,
            });
            console.log("Test res: ", res);
        } catch (error) {
            console.log(error);
        }
    };
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
                    <h2>Welcome back, {user.username}!</h2>
                    <div className="scoreboard">
                        <h3>Scoreboard</h3>
                        <ul>
                            {user.scores ? (
                                user.scores.map((score, index) => (
                                    <li key={index}>{score}</li>
                                ))
                            ) : (
                                <li>No scores yet!</li>
                            )}
                        </ul>
                    </div>
                </div>
            )}
            <div className="start_game">
                <button>Start Game</button>
            </div>
            <div className="test">
                <button onClick={handleTest}>Test</button>
            </div>

            {/* ALON - add your design here. I'll integrate it all together later. */}
        </>
    );
};

export default Homepage;
