import getDatosUser from "../../Datos/ObtenerCalculoCalorias";
import Contenedor from "../Contenedor/Contenedor";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";
import FormularioAlimentos from "../FormularioAlimentos/FormularioAlimentos";

export default function AccionesAlimentos(){
    const {user} = useContext(AuthContext);
    const [alimentos, setAlimentos] = useState([])
    const url = `https://localhost:7051/api/v1/Alimentos/Obtener Alimentos?id=${user.id}`;
    const cabeza = ['Nombre del Alimento', 'Carbohidratos', 'Proteina', 'Grasa', 'Calorias', 'Descripcion', 'Acciones'];
    const elmentos = ['nombreAlimento', 'carbohidratos', 'proteina', 'grasa', 'calorias', 'descripcion', 'funcion', 'editar']

    useEffect(() => {
        getDatosUser(url, user.jwToken)
            .then(res => {
                setAlimentos(res)
            })
            .catch(err => console.error(err))
    }, [url, user])

    if(Array.isArray(alimentos)){
        alimentos.forEach((element) => {
            element.funcion = 'EliminarAlimentos',
            element.editar = 'Editar'
        })
    }

    console.log('Alimentos', alimentos)


    return<>
    <Contenedor elemento="main">
        <FormularioAlimentos />
        {Array.isArray(alimentos) ? <ContenedorAlimentos aray={alimentos ? alimentos : []} elementos={elmentos} thead={cabeza}/> : <h1>No hay contenido</h1>}
    </Contenedor>
    </>
}