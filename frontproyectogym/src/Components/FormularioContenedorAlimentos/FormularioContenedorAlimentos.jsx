import { AuthContext } from "../../Auth/AuthContext";
import Contenedor from '../Contenedor/Contenedor'
import { useContext, useEffect, useState } from "react";
import getDatosUser from "../../Datos/ObtenerCalculoCalorias";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";

export default function FormularioContenedorAlimentos(){
    const [alimentos, setAlimentos] = useState([]);
    const camposAlimentos = ['nombreAlimento', 'carbohidratos', 'proteina', 'grasa', 'calorias', 'descripcion']
    const {user} = useContext(AuthContext)
    const url = `https://localhost:7051/api/v1/Alimentos/Obtener Alimentos?id=${user.id}`
    useEffect(() => {
        getDatosUser(url, user.jwToken)
            .then(res => {
                setAlimentos(res)
            })
            .catch(err => console.error(err))
    }, [url, user])
    console.log(alimentos)

    return <Contenedor elemento="main">
        <ContenedorAlimentos  elementos={camposAlimentos} thead={['Nombre del Alimento', 'Carbohidratos', 'Proteina', 'Grasa', 'Calorias', 'Descripcion']} aray={alimentos}/>
    </Contenedor>
}