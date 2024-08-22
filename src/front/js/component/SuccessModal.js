import React from "react";
import "../../styles/SuccessModal.css";

const SuccessModal = ({ show, handleClose }) => {
    if (!show) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <button className="close-button" onClick={handleClose}>
                    ×
                </button>
                <h2 className="modal-title">Success</h2>
                <p className="modal-body">User created successfully!</p>
                <button className="ok-button" onClick={handleClose}>
                    OK
                </button>
            </div>
        </div>
    );
};

export default SuccessModal;
