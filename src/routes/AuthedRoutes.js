import { Navigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

//------------------//

const PrivateUserRoute = ({ children }) => {
    const { user } = useAuthContext();

    return user ? children : <Navigate to="/"></Navigate>;
};

const PrivateRouteUnAuthed = ({ children }) => {
    const { user } = useAuthContext();

    return !user ? children : <Navigate to="/"></Navigate>;
};

const PrivateAdminRoute = ({ children }) => {
    const { user } = useAuthContext();

    return user && user.admin ? children : <Navigate to="/"></Navigate>;
};

export { PrivateUserRoute, PrivateRouteUnAuthed, PrivateAdminRoute };
