import React, { useEffect } from "react";
import useAuthContext from "../hooks/useAuthContext";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";

const AuthForm = () => {
    const { userAction } = useAuthContext();

    useEffect(() => {
        console.log("userAction:", userAction);
    }, []);

    return (
        <>
            {userAction === "login" && <LoginForm />}
            {userAction === "signup" && <SignupForm />}
        </>
    );
};

export default AuthForm;
