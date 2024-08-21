import { AuthContext } from "../../Auth/AuthContext";
import { useContext } from "react";
import Grafica from '../Grafica/Grafica'
import styles from './Perfil.module.css'
import CerrarSesion from "../CerrarSesion/CerrarSesion";
import { useNavigate } from "react-router-dom";

export default function Perfil({imagenPerfil, calorias , porcentajeCalculado, fecha, caloriasGenerales, usuario}){
    const { user } = useContext(AuthContext)
    const navigate = useNavigate();
    console.log('Usuario: ',usuario)
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

        <p style={{ color: '#00B98E' }}>
            <span className={styles.spanCalorias}>Calorias consumidas:</span> {caloriasGenerales}
        </p>

        <div className="progress" role="progressbar" aria-label="Example with label" aria-valuenow={porcentajeCalculado} aria-valuemin="0" aria-valuemax="100">
    <div 
        className="progress-bar" 
        style={{ 
            width: `${porcentajeCalculado}%`, 
            backgroundColor: porcentajeCalculado >= 100 ? 'red' : '' 
        }}
    >
        {`${porcentajeCalculado}%`}
    </div>
</div>

<section >
                {usuario ? <Grafica grasa={usuario.grasas} proteina={usuario.proteinas} carbohidratos={usuario.carbohidratos}/> : ''}
                <p className="text-center"> Gráfico de Macronutrientes.</p>
            </section>


    </div>


    <div className="mt-4 mt-md-5 text-center d-flex flex-column" style={{gap: '20px'}}>
        <button className="btn btn-success" onClick={() => navigate(`/accionesAlimentos/${fecha}`)}>Alimentos</button>

        <button onClick={(() => navigate(`/MiPerfil/${fecha}`))} className="btn btn-success">Mi Perfil</button>
    </div>
</div>

        
    </>
}