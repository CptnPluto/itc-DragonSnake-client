import { Routes, Route } from "react-router-dom";
import { PrivateUserRoute } from "./routes/AuthedRoutes";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import SPGamepage from "./pages/SPGamepage";
import Modal from "./components/Modal";
import AuthForm from "./components/AuthForm";
import WaitingRoom from "./pages/WaitingRoom";
import MPGamepage from "./pages/MPGamepage";

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

                <Route
                    path="/waitingRoom"
                    element={
                        <PrivateUserRoute>
                            <WaitingRoom />
                        </PrivateUserRoute>
                    }
                />
                <Route
                    path="/mpGamepage"
                    element={
                        <PrivateUserRoute>
                            <MPGamepage />
                        </PrivateUserRoute>
                    }
                />
                <Route path="/spGamepage" element={<SPGamepage />} />
            </Routes>

            <Modal title="Authentication">
                <AuthForm />
            </Modal>
        </>
    );
}

export default App;
