import { initializeApp } from "firebase/app";
import {getStorage, ref, uploadBytes} from "firebase/storage"
import { doc,addDoc, collection, getFirestore, deleteDoc, updateDoc} from "firebase/firestore";
//import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAWDnL8CAvLjPI31M4_noGp8RU8vrdzsys",
    authDomain: "perci-5962b.firebaseapp.com",
    projectId: "perci-5962b",
    storageBucket: "perci-5962b.appspot.com",
    messagingSenderId: "480592651242",
    appId: "1:480592651242:web:e3f41a05715b3bb7e00893",
    measurementId: "G-T9JDZ9HGYH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)

export function uploadFiles(file, name){
    const storageRef = ref(storage, "platos/" + name)
    uploadBytes(storageRef, file)
}

export async function addPlato(titulo, precio, ingredientes, categoria){
    try {
        const docRef = await addDoc(collection(db, "platos"), {
            titulo:titulo,
            categoria:categoria,
            ingredientes:ingredientes,
            precio:precio
        });
        console.log("Document written with ID: ", docRef.id);
        } catch (e) {
        console.error("Error adding document: ", e);
        }
};

export async function eliminar(p){
    await deleteDoc(doc(db, "platos", p.id));
}

export async function actualizar(id, titulo, ingredientes, precio, categoria){
    const docRef = doc(db, "platos/", id);
    
    try {
        await updateDoc(docRef, {
            titulo: titulo,
            precio: precio,
            categoria:categoria,
            ingredientes: ingredientes,
        });
        console.log('Documento actualizado con éxito');
        } catch (error) {
        console.error('Error al actualizar el documento: ', error);
        }
    };