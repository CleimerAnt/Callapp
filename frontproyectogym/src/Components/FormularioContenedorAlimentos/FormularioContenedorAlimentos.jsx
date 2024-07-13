import { AuthContext } from "../../Auth/AuthContext";
import Contenedor from '../Contenedor/Contenedor'
import { json, useParams } from "react-router-dom";
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
    const urlPostContenedor = `https://localhost:7051/api/v1/ContenedorAlimentos`;

    const onSubmit = handleSubmit(async (data) => {
        const alimentosIdObjeto = [data.alimentosId] 
        data.alimentosId = alimentosIdObjeto;
        console.log(JSON.stringify(data))
        try{
            const response = await postDataAutorizacion(urlPostContenedor, data, user)
            console.log(await response)
        }
        catch(err){
            console.error(err)
        }
    })

    const boton = (id) =>{
        return <>
            <form onSubmit={onSubmit}>
                <CampoInput 
                name='horario'
                type={'hidden'}
                register={register}
                value={comida.toString()}
                required={true}
                errors={errors}
                />
                
                <CampoInput 
                name={'usuarioIdString'}
                type={'hidden'}
                register={register}
                required={true}
                value={user.id}
                errors={errors}
                />

                <CampoInput 
                name={'alimentosId'}
                type={'hidden'}
                register={register}
                required={true}
                value={[id]}
                errors={errors}
                />

                <BotonForm texto={'Agregar'} tipoBoton={'btn btn-primary'}/>
            </form>
        </>
    }
    alimentos.forEach((element) => {
        element.funcion = boton(element.id);
    })
    return <Contenedor elemento="main">
        <ContenedorAlimentos  elementos={camposAlimentos} thead={['Nombre del Alimento', 'Carbohidratos', 'Proteina', 'Grasa', 'Calorias', 'Descripcion', 'Acciones']} aray={alimentos}/>
    </Contenedor>
}