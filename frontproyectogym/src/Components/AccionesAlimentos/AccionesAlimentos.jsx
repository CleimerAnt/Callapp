import getDatosUser from "../../Datos/ObtenerCalculoCalorias";
import Contenedor from "../Contenedor/Contenedor";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";
import FormularioAlimentos from "../FormularioAlimentos/FormularioAlimentos";
import HeaderPaginaPrincipal from "../HeaderPaginaPrincipal/HeaderPaginaPrincipal";
import { useParams } from "react-router-dom";

export default function AccionesAlimentos(){
    const {user} = useContext(AuthContext);
    const {fecha} = useParams()
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
    <HeaderPaginaPrincipal fecha={fecha}/>
    <Contenedor elemento="main" margin={'mt-4'}>
        <FormularioAlimentos />
        <div className="mt-4">
        {Array.isArray(alimentos) ? <ContenedorAlimentos aray={alimentos ? alimentos : []} elementos={elmentos} thead={cabeza}/> : <h1 className="text-center mt-4">No hay contenido</h1>}
        </div>
    </Contenedor>
    </>
}