import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from "./Form";

const Modals = ({ isOpen, closeModal}) => {
    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>Subir</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form></Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeModal}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

Modals.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    };

export default Modals;