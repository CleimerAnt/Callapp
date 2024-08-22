import { useState } from "react";
import styles from '../ModalReact/ModalReact.module.css';
import Grafica from "../Grafica/Grafica";

export default function ModalReact({isGrafica = false ,tituloBoton, body, proteina = 0, carbohidratos = 0, grasas = 0, tipoBoton = 'btn btn-primary' } ) {
    const [estado, setEstado] = useState(false);

    function cambiarEstado() {
        setEstado(!estado);
    }

    return (
        <>
            <button onClick={cambiarEstado} className={`${tipoBoton}`}>{tituloBoton}</button>

            {estado && (
                <div className={styles.overlay}>
                    <div className={styles.contenedor}>
                        <div className={styles.modalHead}>

                        <button className={`${styles.cerrar} btn btn-secondary float-end`} onClick={cambiarEstado}><i class="fa-solid fa-x"></i></button>
                        </div>
                        {isGrafica ? <>
                            <Grafica proteina={proteina} grasa={grasas} carbohidratos={carbohidratos} />
                            <p className="text-center">Gráfico de Macronutrientes.</p>
                        </> : ''}
                        {body()}
                    </div>
                </div>
            )}
        </>
    );
}
