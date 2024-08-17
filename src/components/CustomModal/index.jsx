// src/components/CustomModal.js
import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

export const CustomModal = ({ show, handleClose, title, description }) => {
  return (
    <Modal show={show} onHide={handleClose} aria-labelledby="contained-modal-title-vcenter"
    centered> 
      <Modal.Body>
        <div className="p-3 text-center">
          <h4>User Authentication!!!</h4>
          <p>{description}.</p>
        </div>
        <div className="btn-list d-flex justify-content-between gap-5">
        <Button variant="outline-secondary" onClick={handleClose}>
          Close
        </Button>
        <Link className="btn btn-primary w-25" to="/login">
          Login
        </Link>
        </div>
      </Modal.Body>
    </Modal>
  );
};
