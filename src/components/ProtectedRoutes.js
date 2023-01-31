import React from "react";
import { Navigate} from 'react-router-dom'
import useAuthContext from "../hooks/useAuthContext";

function ProtectedRoutes({ children }) {
  const { user } = useAuthContext();
  if ( user ) {
    return <>{children}</>;
  } else return <Navigate to="/" replace/>;
}

export default ProtectedRoutes;