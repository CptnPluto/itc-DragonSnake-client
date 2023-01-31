import { Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import Gamepage from "./pages/Gamepage";
import SPGamepage from "./pages/SPGamepage";
import Modal from "./components/Modal";
import AuthForm from "./components/AuthForm";
import ProtectedRoutes from "./components/ProtectedRoutes";

import useAuthContext from "./hooks/useAuthContext";

function App() {
  const { user, loading } = useAuthContext();

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <Navbar />

          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/gamepage" element={<Gamepage />} />
            <Route path="/sp_gamepage" element={<SPGamepage />} />
            <Route path="/scores" element={<ProtectedRoutes><Profile /></ProtectedRoutes>}/>
            <Route path="/scores/:id" element={<ProtectedRoutes><Profile /></ProtectedRoutes>}/>
            <Route path="/scores/high/:id" element={<ProtectedRoutes><Profile /></ProtectedRoutes>}/>
            <Route path="/scores/latest/:id" element={<ProtectedRoutes><Profile /></ProtectedRoutes>}/>
          </Routes>

          <Modal title="Authentication">
            <AuthForm />
          </Modal>
        </>
      )}
    </>
  );
}

export default App;
