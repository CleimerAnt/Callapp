import { AuthContext } from "../../Auth/AuthContext";
import { useContext } from "react";
import styles from './Perfil.module.css'
import CerrarSesion from "../CerrarSesion/CerrarSesion";
import { useNavigate } from "react-router-dom";

export default function Perfil({imagenPerfil, calorias , porcentajeCalculado, fecha}){
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();

    return <>
       <div className={`${styles.perfil}`}>
    <div className="text-center">
        <img className={styles.imagenPerfil} src={imagenPerfil} alt="Imagen de Usuario" />
        <p className={`${styles.nombreUsuario}`}>{user.userName}</p>
        <CerrarSesion />
    </div>
    <div className="mt-5">
        <p style={{ color: '#00B98E' }}>
            <span className={styles.spanCalorias}>Meta calórica:</span> {calorias}
        </p>

        <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100">
            <div className="progress-bar" style={{ width: `${porcentajeCalculado}%` }}>{`${porcentajeCalculado}%`}</div>
        </div>
    </div>

    <div className="mt-4 mt-md-5 text-center d-flex flex-column" style={{gap: '20px'}}>
        <button className="btn btn-success" onClick={() => navigate(`/accionesAlimentos/${fecha}`)}>Alimentos</button>

        <button onClick={(() => navigate('/MiPerfil'))} className="btn btn-success">Mi Perfil</button>
    </div>
</div>

        
    </>
}