import getDatosUser from "../../Datos/ObtenerCalculoCalorias";
import Contenedor from "../Contenedor/Contenedor";
import { Link } from "react-router-dom";
import postDataAutorizacion from "../../Datos/PostDataAutorizacion";
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
        <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
                <HeaderPaginaPrincipal fecha={fecha} home= {true}/>
        </Contenedor>
        
    <main  style={{backgroundColor : '#F1F1F1', height : '90vh'}}>

        <section className="container pt-4">
            <Link className="btn btn-primary" to={`/FormulaioAgregarAlimentos/${fecha}`}>Agregar</Link>
        </section>
        
        <div className="mt-4 container">
        {Array.isArray(alimentos) ? <ContenedorAlimentos  aray={alimentos ? alimentos : []} elementos={elmentos} thead={cabeza}/> : <h1 className="text-center mt-4">No hay alimentos</h1>}
        </div>
    </main>
    </>
}