import React, { useCallback } from "react";
import { useEffect, useRef } from "react";

import useAuthContext from "../hooks/useAuthContext";
import "../globalStyles.css";

const Modal = ({ close, children }) => {
    // Close modal on escape key press
    const modalRef = useRef();

    const closeOnEscapeKeyDown = useCallback(
        (e) => {
            if ((e.charCode || e.keyCode) === 27) {
                close();
            }
        },
        [close]
    );

    useEffect(() => {
        // setTimeout(() => {
        //     modalRef.current.classList.add("active");
        // }, 10);
        document.addEventListener("keydown", closeOnEscapeKeyDown);
        return () => {
            document.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, [closeOnEscapeKeyDown]);

    return (
        <div className="gameModal">
            <div className="gameModal-content">
                {children}
            </div>
        </div>
    );
};

export default Modal;