import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";

import { AuthContextProvider } from "./contexts/AuthContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    //   <React.StrictMode>
    <AuthContextProvider>
        <Router>
            <App />
        </Router>
    </AuthContextProvider>
    //   </React.StrictMode>
);
