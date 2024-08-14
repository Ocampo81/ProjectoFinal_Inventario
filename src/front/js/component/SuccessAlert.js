import React, { useEffect } from "react";
import "../../styles/SuccessAlert.css";

const SuccessAlert = ({ message, onClose }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose();
        }, 4000);

        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className="success-alert-overlay">
            <div className="success-alert-modal">
                <h2>Success</h2>
                <p>{message}</p>
                <button onClick={onClose}>OK</button>
            </div>
        </div>
    );
};

export default SuccessAlert;
