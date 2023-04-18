import { useState } from "react";

const useValidation = () => {
    const [valErrorMessage, setValErrorMessage] = useState("");

    const signupFormValidation = (signupInfo) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(signupInfo.email)) {
            setValErrorMessage("Error: Invalid email format");
            throw new Error("Invalid email");
        }
        if (signupInfo.password.length < 6) {
            setValErrorMessage("Password must be at least 6 characters");
            throw new Error("Error: Password must be at least 6 characters");
        }
        if (signupInfo.password !== signupInfo.repassword) {
            setValErrorMessage("Error: Passwords do not match");
            throw new Error("Passwords do not match");
        }
    };

    return { signupFormValidation, valErrorMessage };
};

export default useValidation;
