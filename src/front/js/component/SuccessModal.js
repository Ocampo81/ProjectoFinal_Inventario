import React from "react";
import { Modal, Button } from "react-bootstrap";

const SuccessModal = ({ show, handleClose }) => {
    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>Success</Modal.Title>
            </Modal.Header>
            <Modal.Body>User created successfully!</Modal.Body>
            <Modal.Footer>
                <Button variant="success" onClick={handleClose}>
                    OK
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default SuccessModal;
