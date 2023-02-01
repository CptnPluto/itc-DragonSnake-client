import React from "react";
import useAuthContext from "../hooks/useAuthContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = () => {
    const { userAction } = useAuthContext();

    return (
        <>
            {userAction === "login" && <LoginForm />}
            {userAction === "signup" && <SignupForm />}
        </>
    );
};

export default AuthForm;
