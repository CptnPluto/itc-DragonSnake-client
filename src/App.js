import { Routes, Route } from "react-router-dom";
import { PrivateUserRoute } from "./routes/AuthedRoutes";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import SPGamepage from "./pages/SPGamepage";
import Modal from "./components/Modal";
import AuthForm from "./components/AuthForm";

//adding for testing
import Gamepage from "./pages/Gamepage";

// import JoinAddRoom from "./components/JoinAddRoom";

function App() {
    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route
                    path="/profile"
                    element={
                        <PrivateUserRoute>
                            <Profile />
                        </PrivateUserRoute>
                    }
                />
                {/* 
                <Route
                    path="/gamepage"
                    element={
                        <PrivateUserRoute>
                            <JoinAddRoom />
                        </PrivateUserRoute>
                    }
                /> */}
                {/* adding for testing */}
                <Route
                    path="/gamepage"
                    element={
                        <PrivateUserRoute>
                            <Gamepage />
                        </PrivateUserRoute>
                    }
                />
                <Route path="/sp_gamepage" element={<SPGamepage />} />
            </Routes>

            <Modal title="Authentication">
                <AuthForm />
            </Modal>
        </>
    );
}

export default App;
