import { useContext, useEffect, useState } from "react";
import CerrarSesion from "../CerrarSesion/CerrarSesion";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import getDatosUser from '../../Datos/ObtenerCalculoCalorias'

export default function PaginaPrincipal() {
    const { user } = useContext(AuthContext);
    const [state, setState204] = useState();
    const navigate = useNavigate();

    
    useEffect(() => {
        if (state === 204) {
            navigate('/FormularioCalorias');
        }
    }, [state, navigate]);

    return (
        <Contenedor elemento="header">
            <h1>Pagina Principal</h1>
            <p>Nombre de Usuario: {user.userName}</p>
            <CerrarSesion />
        </Contenedor>
    );
}


