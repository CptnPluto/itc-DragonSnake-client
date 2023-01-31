import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
// import Gamepage from "./pages/Gamepage";
import SPGamepage from "./pages/SPGamepage";
import Modal from "./components/Modal";
import AuthForm from "./components/AuthForm";

// import useAuthContext from "./hooks/useAuthContext";
import JoinAddRoom from "./components/JoinAddRoom";

function App() {
    // const { user } = useAuthContext();

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/gamepage" element={<JoinAddRoom />} />
                <Route path="/sp_gamepage" element={<SPGamepage />} />
            </Routes>

            <Modal title="Authentication">
                <AuthForm />
            </Modal>
        </>
    );
}

export default App;
