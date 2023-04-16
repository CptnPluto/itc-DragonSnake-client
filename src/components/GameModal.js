import React, { useCallback } from "react";
import { useEffect } from "react";

import "../globalStyles.css";

const Modal = ({ close, children }) => {
    // Close modal on escape key press
    const closeOnEscapeKeyDown = useCallback(
        (e) => {
            if ((e.charCode || e.keyCode) === 27) {
                close();
            }
        },
        [close]
    );

    useEffect(() => {
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
