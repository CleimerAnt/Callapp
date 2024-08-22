import { useState } from "react"
import styles from '../ModalReact/ModalReact.module.css'


export default function ModalReact({tituloBoton, children, id}){
    const [estado, setEstado] = useState(false);

    function cambiarEstado(){
        setEstado(() => !estado)
    }
    return<>
        <button onClick={cambiarEstado} className="btn btn-primary">{tituloBoton}</button>

        {estado === true ? 
        <div className={styles.overlay}>
            <div className={styles.contenedor}>
            <h1>Contenido {id}</h1>
            <button onClick={cambiarEstado}>Cerrar</button>
            </div>
        </div>
        : ''}
    </>
}