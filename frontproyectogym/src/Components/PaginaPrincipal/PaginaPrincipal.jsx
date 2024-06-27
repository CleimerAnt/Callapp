import { useContext, useEffect, useState } from "react";
import CerrarSesion from "../CerrarSesion/CerrarSesion";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import FormularioCalorias from "../FormularioCalorias/FormularioCalorias";

export default  function PaginaPrincipal() {
    const { user } = useContext(AuthContext);
    const [state, setState204] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            const url = `https://localhost:7051/api/v1/Usuario/ObtenerUsuarios?id=${user.id}`;
            getDatosUser(url).then(response => {
                if (response && response.status === 204) {
                    setState204(response.status)
                } 
            }).catch(err => {
                console.error('Error', err)
                return;
            });
        }
    }, [user]);

    console.log(state)

    return (
        <Contenedor elemento="header">
        <h1>Pagina Principal</h1>
        <p>Nombre de Usuario: {user.userName}</p>
        {state === 204 ? navigate('/FormularioCalorias')  : ''}
        <CerrarSesion />
        </Contenedor>
    );
}

function getDatosUser(url) {
    return fetch(url)
        .then(res => {
            if (res.status === 204) {
                return { status: 204 };
            }
            return res.json();
        })
        .catch(err => {
            console.error('error', err);
            return null;
        });
}