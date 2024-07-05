import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { useContext } from "react";
import styles from './Perfil.module.css'
import CerrarSesion from "../CerrarSesion/CerrarSesion";

export default function Perfil({imagenPerfil, calorias}){
    const { user } = useContext(AuthContext)
    return <>
        <div className={`${styles.perfil} `}>
            <img className={styles.imagenPerfil} src={imagenPerfil} alt="Imagen de Usuario" />
            <p>{user.userName}</p>
        </div>
        <p><span className={styles.spanCalorias}>Calorias:</span> {calorias} </p>
        
        <CerrarSesion />
    </>
}