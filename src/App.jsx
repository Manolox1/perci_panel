import Tabla from './components/Tabla'
import './App.css'
import { auth } from './firebase/config'
import { useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth';
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

  return (
    <>
      {user?<Tabla/>:<Login/>}
    </>
  )
}

export default App
