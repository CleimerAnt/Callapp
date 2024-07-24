import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { useContext } from "react";
import styles from './Perfil.module.css'
import CerrarSesion from "../CerrarSesion/CerrarSesion";
import { useNavigate } from "react-router-dom";

export default function Perfil({imagenPerfil, calorias}){
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    return <>
        <div className={`${styles.perfil} `}>
            <img className={styles.imagenPerfil} src={imagenPerfil} alt="Imagen de Usuario" />
            <p>{user.userName}</p>
        </div>
        <p><span className={styles.spanCalorias}>Calorias:</span> {calorias} </p>
        
        <CerrarSesion />

        <button className="btn btn-primary" onClick={() => navigate('/accionesAlimentos')}>Alimentos</button>
    </>
}