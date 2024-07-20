import { AuthContext } from "../../Auth/AuthContext";
import Contenedor from '../Contenedor/Contenedor'
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CampoInput from '../CampoInput/CampoInput'
import getDatosUser from "../../Datos/ObtenerCalculoCalorias";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";
import BotonForm from "../BotonForm/BotonForm";
import {useForm} from 'react-hook-form'
import postDataAutorizacion from "../../Datos/PostDataAutorizacion";

export default function FormularioContenedorAlimentos(){
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [alimentos, setAlimentos] = useState([]);
    const {comida} = useParams()
    const camposAlimentos = ['nombreAlimento', 'carbohidratos', 'proteina', 'grasa', 'calorias', 'descripcion', 'funcion']
    const {user} = useContext(AuthContext)
    const url = `https://localhost:7051/api/v1/Alimentos/Obtener Alimentos?id=${user.id}`
    
    useEffect(() => {
        getDatosUser(url, user.jwToken)
            .then(res => {
                setAlimentos(res)
            })
            .catch(err => console.error(err))
    }, [url, user])

    if(alimentos.status === 204){
        return <h1>No Hay alimentos</h1>
    }

    alimentos.forEach((element)=>{
        element.funcion = 'funcion'
        element.horaio = comida;
    })
    return <Contenedor elemento="main">
        <ContenedorAlimentos  elementos={camposAlimentos} thead={['Nombre del Alimento', 'Carbohidratos', 'Proteina', 'Grasa', 'Calorias', 'Descripcion', 'Acciones']} aray={alimentos}/>
    </Contenedor>
}