// src/components/CustomModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CustomModal = ({ show, handleClose, title, description }) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center">
        <p>{description}.</p>
        <Link className="btn btn-primary w-25 m-auto" to="/login">
          Login
        </Link>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};
