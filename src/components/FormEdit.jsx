import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { actualizar, uploadFiles } from "../firebase/config";
import "../styles/Form.css"

const FormEdit = (datoss) => {
    const [inputValue, setInputValue] = useState('');
    const [ingredientes, setingredientes] = useState([]);
    const [id, setId] = useState("")
    const [file, setFile] = useState(null)
    const [titulo, setTitulo] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")

    const cargar =()=>{
        setId(datoss.datoss.id)
        setPrecio(datoss.datoss.precio);
        setTitulo(datoss.datoss.titulo);
        setCategoria(datoss.datoss.categoria);
        setingredientes(datoss.datoss.ingredientes);
    }
    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const addValueToArray = () => {
        setingredientes([...ingredientes, " "+inputValue]);
        setInputValue('');
    };

    const handlePrice = (event) => {
        setPrecio(event.target.value);
    };

    const evitar = (e) =>{
        if (e.key == "Enter") {
            e.preventDefault();
            addValueToArray();
        }
    }

    const handleDelete = (deleteIngre) =>{
        const newIngre = ingredientes.filter((ingre)=>ingre !== deleteIngre);
        setingredientes(newIngre);
    }


    const handleActualizar =(e) => {
        e.preventDefault()
        uploadFiles(file, titulo)
        actualizar(id, titulo, ingredientes, precio, categoria); // Llama a la función actualizar de config.js
    };
    
    useEffect(()=>{
        cargar();
    },[]);

    return (
    <div className="agregar">
                    <form onSubmit={handleActualizar} onKeyDown={evitar}>
                        <h1>Subir Plato</h1>

                        <input type="text" 
                        placeholder="Nombre del Plato"
                        value={titulo} 
                        onChange={e=>{
                        setTitulo(e.target.value)
                        }}/>
                            
                        <input type="file" 
                        value={file? undefined:""} 
                        onChange={e=>{
                        setFile(e.target.files[0])
                        }}/>

                        <select name="" id=""
                        value={categoria}
                        onChange={
                            e=>{
                                if (e.target.value!="") {
                                    setCategoria(e.target.value)
                                }
                            }
                        }>
                            <option value="Promos">Promos</option>
                            <option value="Carnes">Carnes</option>
                            <option value="Ensaladas">Ensaladas</option>
                            <option value="Vinos y Tragos">Vinos y Tragos</option>
                            <option value="Hamburguesas">Hamburguesas</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Revueltos">Revueltos</option>
                            <option value="Cafeteria">Cafeteria</option>
                            <option value="Tortas">Tortas</option>
                            <option value="Sandwiches">Sandwiches</option>
                            <option value="Pastas">Pastas</option>
                        </select>

                        <div className="group-file">
                            <input
                            placeholder="Ingredientes"
                            type="text"
                            id="inputField"
                            value={inputValue}
                            onChange={handleChange}
                            />
                            <button type="button" onClick={addValueToArray}>Añadir</button>
                        </div>
                        

                        <ul>
                            {ingredientes.map((value, index) => (
                            <li key={index} onClick={()=>handleDelete(value)}>{value}</li>
                        ))}
                        </ul>

                        <input type="number" 
                        placeholder="Precio"
                        value={precio} 
                        id="" 
                        min={0} 
                        onChange={handlePrice}/>


                        <input type="submit" className="subir" value={"actualizar"}/>
                    </form>

                </div>
    )
}

FormEdit.propTypes = {
    datoss:PropTypes.object.isRequired,
    };

export default FormEdit