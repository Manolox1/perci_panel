import { useState, useEffect } from "react";
import { collection, onSnapshot} from 'firebase/firestore';
import { auth, db } from "../firebase/config";
import { Table } from "react-bootstrap";
import Modals from "./Modal";
import ModalEdit from "./ModalEdit";
import ModalEliminar from "./ModalEliminar";
import "../styles/Tabla.css"
import { signOut } from "firebase/auth";


const Tabla = () => {
    const [productos, setProductos] = useState([]);
    const [textEdit, setTextEdit] = useState({
        id:'',
        titulo:'',
        ingredientes:[],
        precio:0,
    })

    function useActivo() {
        const [isModalOpen, setIsModalOpen] = useState(false);
        
            function alternarActivo() {
                setIsModalOpen(prevActivo => !prevActivo);
            }
        
            return { isModalOpen, alternarActivo };
        }

    function useActivoEdit() {
        const [isModalEditOpen, setIsModalEditOpen] = useState(false);
            
            function alternarEditActivo(p) {
                setIsModalEditOpen(prevActivo => !prevActivo);
                setTextEdit(p);
            }
            
            return { isModalEditOpen, alternarEditActivo };
        }
    
    function useActivoEliminar() {
            const [isModalEliminarOpen, setIsModalEliminarOpen] = useState(false);
                
                function alternarEliminarActivo(p) {
                    setIsModalEliminarOpen(prevActivo => !prevActivo);
                    setTextEdit(p)
                }
                
                return { isModalEliminarOpen, alternarEliminarActivo };
            }
    

    const { isModalOpen, alternarActivo } = useActivo();
    const { isModalEditOpen, alternarEditActivo } = useActivoEdit();
    const { isModalEliminarOpen, alternarEliminarActivo } = useActivoEliminar();
        

    useEffect(() => {
        // Crea la referencia a la colección y escucha cambios en tiempo real
        const unsub = onSnapshot(collection(db, "platos"), (snapshot) => {
            const productosData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setProductos(productosData);
        });

        // Limpia el listener al desmontar el componente
        return () => unsub();
    }, []);

    const formatearPrecio = (precio) => {
        const numero = Number(precio);
        if (isNaN(numero)) return '0'; // Manejar casos donde el precio no es un número
    
        // Convertir a string y usar regex para formatear
        return numero.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    };


    return (
            <div className='container'>
                <div className="title">
                    <h1>Lista de Platos</h1>
                    <button onClick={alternarActivo}>Subir plato</button>
                    <button onClick={()=>signOut(auth)}>Cerrar Sesión</button>
                </div>
                <Table>
                    <thead>
                        <tr>
                            <th>Plato</th>
                            <th>Categoria</th>
                            <th>Ingredientes</th>
                            <th>Precio</th>
                            <th>Accion</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            productos.map(p=>(
                                <tr key={p.id}>
                                    <td>{p.titulo}</td>
                                    <td>{p.categoria}</td>
                                    <td>{p.ingredientes+" "}</td>
                                    <td>
                                        ${formatearPrecio(p.precio)}
                                    </td>
                                    <td className="btns">
                                        <button className="edit" onClick={()=>alternarEditActivo(p)}>Editar</button>
                                        <button className="borrar" onClick={()=>alternarEliminarActivo(p)}>Eliminar</button>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
                <Modals isOpen={isModalOpen} closeModal={alternarActivo}></Modals>
                <ModalEdit isOpen={isModalEditOpen} closeModal={alternarEditActivo} datos={textEdit}></ModalEdit>
                <ModalEliminar isOpen={isModalEliminarOpen} closeModal={alternarEliminarActivo} datos={textEdit}></ModalEliminar>
            </div>
    )
}

export default Tabla