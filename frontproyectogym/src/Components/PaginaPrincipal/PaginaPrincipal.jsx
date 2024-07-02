import { useContext, useEffect, useState } from "react";
import CerrarSesion from "../CerrarSesion/CerrarSesion";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';
import styles from './PaginaPrincipal.module.css';
import imagen from '../../assets/imagenPerfil.jpg';
import Perfil from "../Perfil/Perfil";

export default function PaginaPrincipal() {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState();
    const [calorias, setCalorias] = useState();

    console.log("usuario", user);
    const navigate = useNavigate();
    const url = `https://localhost:7051/api/v1/Usuario/ObtenerUsuarios?id=${user.id}`;
    
    useEffect(() => {
        getDatosUser(url, user.jwToken)
            .then(res => {
                console.log(res);
                setCalorias(Math.round(res.calorias))
            })
            .catch(err => {
                console.log('error: ', err);
                return null;
            });
    }, [url]);
        

    let imagenPerfil = '';

    if (user.imgUrl === '') {
        imagenPerfil = imagen;
    } else {
        imagenPerfil = `https://localhost:7051${user.imgUrl}`;
    }

    useEffect(() => {
        if (state === 204) {
            navigate('/FormularioCalorias');
        }
    }, [state, navigate]);


    return (
        <Contenedor elemento="main" margin={'mt-3'}>
            <Perfil calorias={calorias} imagenPerfil={imagenPerfil} />
        </Contenedor>
    );
}
