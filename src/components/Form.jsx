import { useState } from "react";
import { uploadFiles, addPlato } from "../firebase/config";
import "../styles/Form.css"

const Form = () => {
    const [inputValue, setInputValue] = useState('');
    const [valuesArray, setValuesArray] = useState([]);
    //const [id, setId] = useState("")
    const [file, setFile] = useState(null)
    const [titulo, setTitulo] = useState("")
    const [precio, setPrecio] = useState("")
    const [categoria, setCategoria] = useState("")


    const handleChange = (event) => {
        setInputValue(event.target.value);
    };

    const addValueToArray = () => {
        setValuesArray([...valuesArray, " "+inputValue]);
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
        const newIngre = valuesArray.filter((ingre)=>ingre !== deleteIngre);
        setValuesArray(newIngre);
    }


    const handleSubmit = (e) =>{
        e.preventDefault();
        uploadFiles(file, titulo);
        addPlato(titulo, precio, valuesArray, categoria);
        setInputValue("");
        setFile(null);
        setPrecio("");
        setTitulo("");
        setValuesArray([]);
    }


    return (
    <div className="agregar">
                    <form onSubmit={handleSubmit} onKeyDown={evitar}>
                        <h1>Subir Plato</h1>

                        <input type="text" 
                        placeholder="Nombre del Plato"
                        value={titulo} 
                        required
                        onChange={e=>{
                        setTitulo(e.target.value)
                        }}/>
                            
                        <input type="file" 
                        value={file? undefined : ""} 
                        required
                        onChange={e=>{
                        setFile(e.target.files[0])
                        }}/>

                        <select name="" 
                        id="" 
                        required
                        onClick={e=>{
                            if(e.target.value!=""){
                                setCategoria(e.target.value)
                            }
                        }}>
                            <option value="">Selecciona una opcion</option>
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
                            {valuesArray.map((value, index) => (
                            <li key={index} onClick={()=>handleDelete(value)}>{value}</li>
                        ))}
                        </ul>

                        <input type="number" 
                        placeholder="Precio"
                        required
                        value={precio} 
                        id="" 
                        min={0} 
                        onChange={handlePrice}/>


                        <input type="submit" className="subir"/>
                    </form>

                </div>
    )
}

export default Form