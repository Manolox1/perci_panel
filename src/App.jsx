import Tabla from './components/Tabla'
import './App.css'
import { auth } from './firebase/config'
import { useState } from 'react'
import { browserSessionPersistence, onAuthStateChanged, setPersistence } from 'firebase/auth';
import Login from './components/Login';


function App() {
  const [user, setUser]=useState(null);

  onAuthStateChanged(auth, (userFirebase)=>{
    if (userFirebase) {
      setUser(userFirebase)
    }else{
      setUser(null)
    }
  })

  setPersistence(auth, browserSessionPersistence)
  .then(() => {
    console.log("La sesión se cerrará automáticamente al cerrar la pestaña.");
  })
  .catch((error) => {
    console.error("Error al configurar la persistencia:", error);
  });

  return (
    <>
      {user?<Tabla/>:<Login/>}
    </>
  )
}

export default App
