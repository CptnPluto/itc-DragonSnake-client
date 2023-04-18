import { Navigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";

const PrivateUserRoute = ({ children }) => {
  const { user } = useAuthContext();
  return user ? children : <Navigate to="/"></Navigate>;
};

export { PrivateUserRoute };
