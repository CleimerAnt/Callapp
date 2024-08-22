import { useState } from "react";
import styles from '../ModalReact/ModalReact.module.css';
import Grafica from "../Grafica/Grafica";

export default function ModalReact({ tituloBoton, body, proteina = 0, carbohidratos = 0, grasas = 0 }) {
    const [estado, setEstado] = useState(false);

    function cambiarEstado() {
        setEstado(!estado);
    }

    return (
        <>
            <button onClick={cambiarEstado} className="btn btn-primary">{tituloBoton}</button>

            {estado && (
                <div className={styles.overlay}>
                    <div className={styles.contenedor}>
                        <h1>Contenido </h1>
                        <Grafica proteina={proteina} grasa={grasas} carbohidratos={carbohidratos} />
                        <button onClick={cambiarEstado}>Cerrar</button>
                        {body()}
                    </div>
                </div>
            )}
        </>
    );
}
