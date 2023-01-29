import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Modal from "./components/Modal";
import AuthForm from "./components/AuthForm";

function App() {
    return (
        <>
            <Navbar />
            <Routes>
                <Route path="/" element={<Homepage />} />
            </Routes>
            <Modal title="Authentication">
                <AuthForm />
            </Modal>
        </>
    );
}

export default App;
