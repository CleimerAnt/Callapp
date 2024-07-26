import { AuthContext } from "../../Auth/AuthContext";
import { useContext } from "react";
import styles from './Perfil.module.css'
import CerrarSesion from "../CerrarSesion/CerrarSesion";
import { useNavigate } from "react-router-dom";

export default function Perfil({imagenPerfil, calorias , porcentajeCalculado}){
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    return <>
        <div className={`${styles.perfil}`}>
            <div>
                <img className={styles.imagenPerfil} src={imagenPerfil} alt="Imagen de Usuario" />
                <p style={{fontSize : '20px'}} className={`${styles.nombreUsuario}`}>{user.userName}</p>
                <CerrarSesion />
            </div>
            <div className="mt-5">
                <p style={{color : '#00B98E'}}><span className={styles.spanCalorias}>Meta calorica:</span> {calorias} </p>

                <div class="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
  <div class="progress-bar" style={{width : `${porcentajeCalculado}%`}}>{`${porcentajeCalculado}%`}</div>
</div>
            </div>

            <div style={{marginTop : '85px'}}>
            <button className="btn btn-success" onClick={() => navigate('/accionesAlimentos')}>Alimentos</button>
            </div>
        </div>
        
    </>
}