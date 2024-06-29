import { useContext, useEffect, useState } from "react";
import CerrarSesion from "../CerrarSesion/CerrarSesion";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import getDatosUser from '../../Datos/ObtenerCalculoCalorias'
import styles from './PaginaPrincipal.module.css'

export default function PaginaPrincipal() {
    const { user } = useContext(AuthContext);
    const [state, setState204] = useState();

    const navigate = useNavigate();
    const url = `https://localhost:7051/api/v1/Usuario/ObtenerUsuarios?id=${user.id}`;
    useEffect(() => {
        getDatosUser(url,user.jwToken)
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log('error: ',err)
                return null;
            })
    }, [url])
    
    
    
    useEffect(() => {
        if (state === 204) {
            navigate('/FormularioCalorias');
        }
    }, [state, navigate]);

    return (
        <Contenedor elemento="header">
            <h1>Pagina Principal</h1>
            <p>Nombre de Usuario: {user.userName}</p>
            <img className={styles.imagenPerfil} src={`https://localhost:7051${user.imgUrl}`} alt="Imagen de Usuario" />
            <CerrarSesion />
        </Contenedor>
    );
}


