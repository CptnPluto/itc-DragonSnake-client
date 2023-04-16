import React from "react";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import useAuthContext from "../contexts/AuthContext";

const AuthForm = () => {
    const {userAction, setUserAction} = useAuthContext();

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
