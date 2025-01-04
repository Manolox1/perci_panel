import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { actualizar } from "../firebase/config";
import { getDownloadURL, getStorage, ref } from "firebase/storage";
import "../styles/Form.css"

const FormEdit = (datoss) => {
    const [inputValue, setInputValue] = useState('');
    const [ingredientes, setingredientes] = useState([]);
    const [id, setId] = useState("")
    const [titulo, setTitulo] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")
    const [imageURL, setImageURL] = useState(null); // Estado para la URL de la imagen

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
        actualizar(id, titulo, ingredientes, precio, categoria); // Llama a la función actualizar de config.js
    };
    
    useEffect(()=>{
        cargar();
    },[]);
    useEffect(() => {
        // Función para obtener la URL y el nombre del archivo desde Firestore Storage
        const fetchImageURL = async () => {
            const storage = getStorage();
            const imageRef = ref(storage, `platos/${datoss.datoss.titulo}`); // Cambia por tu referencia
            const url = await getDownloadURL(imageRef); // Obtenemos la URL
            setImageURL(url); // Guardamos la URL en el estado 
            };
        
            fetchImageURL();
        }, []);

    return (
    <div className="agregar">
                    <form onSubmit={handleActualizar} onKeyDown={evitar}>
                        <h2>{titulo}</h2>
                        <img src={imageURL} alt="" style={{width:"300px"}}/>
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
                            <option value="Postres">Postres</option>
                            <option value="Carnes">Carnes</option>
                            <option value="Ensaladas">Ensaladas</option>
                            <option value="Trago">Trago</option>
                            <option value="Burguers">Burguers</option>
                            <option value="Bebidas">Bebidas</option>
                            <option value="Revueltos">Revueltos</option>
                            <option value="Desayunos">Desayunos</option>
                            <option value="Tortas">Tortas</option>
                            <option value="Sandwiches">Sandwiches</option>
                            <option value="Pastas">Pastas</option>
                            <option value="Milanesas">Milanesas</option>
                            <option value="Entrantes">Entrantes</option>
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