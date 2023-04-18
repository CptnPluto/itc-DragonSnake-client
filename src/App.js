import { Route, Routes } from "react-router-dom";
import { PrivateUserRoute } from "./routes/AuthedRoutes";

import AuthForm from "./components/AuthForm";
import Modal from "./components/Modal";
import Navbar from "./components/Navbar";
import { PlayerProvider } from "./contexts/PlayerContext";
import { SocketProvider } from "./contexts/SocketContext";
import Homepage from "./pages/Homepage";
import Lobby from "./pages/Lobby";
import Profile from "./pages/Profile";
import SPGamepage from "./pages/SPGamepage";

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
          path="/lobby"
          element={
            <PrivateUserRoute>
              <SocketProvider>
                <PlayerProvider>
                  <Lobby />
                </PlayerProvider>
              </SocketProvider>
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
