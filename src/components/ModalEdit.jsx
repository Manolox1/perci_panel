import PropTypes from "prop-types";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormEdit from "./FormEdit";

const ModalEdit = ({ isOpen, closeModal, datos}) => {
    if (!isOpen) return null;

    return (
        <Modal show={isOpen} onHide={closeModal}>
        <Modal.Header closeButton>
            <Modal.Title>Editar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FormEdit datoss={datos}></FormEdit>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={closeModal}>
                Cerrar
            </Button>
            </Modal.Footer>
        </Modal>
    );
};

ModalEdit.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    datos:PropTypes.object.isRequired,
    };

export default ModalEdit;