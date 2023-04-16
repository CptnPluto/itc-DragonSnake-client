import React, { useState } from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = () => {
    const [userAction, setUserAction] = useState("");

    return (
        <>
            {userAction === "login" && (
                <LoginForm setUserAction={setUserAction} />
            )}
            {userAction === "signup" && (
                <SignupForm setUserAction={setUserAction} />
            )}
        </>
    );
};

export default AuthForm;
