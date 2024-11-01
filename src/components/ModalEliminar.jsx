import PropTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { eliminar } from '../firebase/config';

const ModalEliminar = ({isOpen, closeModal, datos}) => {
    if (!isOpen) return null;

    function eliminarYcerrar(){
        eliminar(datos);
        closeModal()
    }

    return (
        <Modal show={isOpen} onHide={closeModal}>
            <Modal.Header closeButton>
                <Modal.Title>¿Desea eliminar el Item?</Modal.Title>
            </Modal.Header>
            <Modal.Body className='btnsEliminar'>
                <p>Una vez eliminado no se podram recupar las fotos ni informacion del plato</p>
                <Button variant="danger" onClick={()=>eliminarYcerrar()}>
                    Eliminar
                </Button>
                <Button variant="primary" onClick={closeModal}>
                    Cancelar
                </Button>
            </Modal.Body>
        </Modal>
    )
}

ModalEliminar.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    datos: PropTypes.object.isRequired,
    };

export default ModalEliminar