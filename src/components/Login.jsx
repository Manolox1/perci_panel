/* eslint-disable no-unused-vars */
import { useState } from "react"

import { auth } from "../firebase/config"
import { signInWithEmailAndPassword } from "firebase/auth"
import "../styles/Login.css"



const Login = () => {
    const [registrando, setRegistrando] = useState(false)

    const funAuth = async(e)=>{
        e.preventDefault();
        const correo = e.target.mail.value;
        const password = e.target.password.value;
        console.log(correo+ " "+ password);
            try{
                await signInWithEmailAndPassword(auth, correo, password)
            }catch(err){
                alert("El correo o la contraseña son incorrectos")
            }
            
    }



    return (
        <div className="logincont">
            <form onSubmit={funAuth}>
                <h1>Ingresar BD Perci</h1> 
                <input type="text" placeholder="Email" id="mail"/>
                <input type="password" placeholder="Contraseña" id="password"/>
                <button>inicia secion</button>
            </form>
        </div>
    )
}

export default Login;