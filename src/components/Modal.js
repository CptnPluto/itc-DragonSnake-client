import React, { useCallback, useEffect, useState } from "react";

import useAuthContext from "../contexts/AuthContext";
import "../globalStyles.css";

const Modal = ({ title, children }) => {
    const { show, setShow } = useAuthContext();
    // Close modal on escape key press

    const closeOnEscapeKeyDown = useCallback(
        (e) => {
            if ((e.charCode || e.keyCode) === 27) {
                setShow(false);
            }
        },
        [setShow]
    );

    useEffect(() => {
        document.addEventListener("keydown", closeOnEscapeKeyDown);
        return () => {
            document.removeEventListener("keydown", closeOnEscapeKeyDown);
        };
    }, [closeOnEscapeKeyDown]);

    return (
        <>
            {show && (
                <div className="modal fade-in" onClick={() => setShow(false)}>
                    <div
                        className="modal-content"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="modal-header">
                            <h2 className="modal-title">{title}</h2>
                        </div>
                        <div className="modal-body">{children}</div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Modal;
