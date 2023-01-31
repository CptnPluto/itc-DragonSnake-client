import React, { useCallback } from "react";
import { useEffect, useRef } from "react";

import useAuthContext from "../hooks/useAuthContext";
import "../globalStyles.css";

const Modal = ({ onClose, title, children }) => {
    const { show, setShow, userAction } = useAuthContext();
    // Close modal on escape key press
    const modalRef = useRef();

    const closeOnEscapeKeyDown = useCallback(
        (e) => {
            if ((e.charCode || e.keyCode) === 27) {
                onClose();
            }
        },
        [onClose]
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

    console.log("userActionModal:", userAction);

    return (
        <>
            {show && userAction && (
                <div
                    ref={modalRef}
                    className="modal fade-in"
                    onClick={() => setShow(false)}
                >
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
