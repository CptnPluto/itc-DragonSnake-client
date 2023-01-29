import { useState } from "react";

const useValidation = () => {
    const [valErrorMessage, setValErrorMessage] = useState("");

    const signupFormValidation = (signupInfo, password2) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(signupInfo.email)) {
            setValErrorMessage("Error: Invalid email format");
            throw new Error("Invalid email");
        }
        if (signupInfo.password.length < 6) {
            setValErrorMessage("Password must be at least 6 characters");
            throw new Error("Error: Password must be at least 6 characters");
        }
        if (signupInfo.password !== password2) {
            setValErrorMessage("Error: Passwords do not match");
            throw new Error("Passwords do not match");
        }
    };

    const editFormValidation = (editInfo) => {
        const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;
        if (!emailRegex.test(editInfo.email)) {
            setValErrorMessage("Error: Invalid email format");
            throw new Error("Invalid email");
        }
        if (!editInfo.firstName || !editInfo.lastName) {
            setValErrorMessage("Error: please enter a valid name.");
            throw new Error("Invalid user name.");
        }
    };

    return { signupFormValidation, editFormValidation, valErrorMessage };
};

export default useValidation;
