import getDatosUser from "../../Datos/ObtenerCalculoCalorias";
import Contenedor from "../Contenedor/Contenedor";
import { Link } from "react-router-dom";
import styles from '../AccionesAlimentos/AccionesAlimentos.module.css'
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";
import HeaderPaginaPrincipal from "../HeaderPaginaPrincipal/HeaderPaginaPrincipal";
import { useParams } from "react-router-dom";

export default function AccionesAlimentos(){
    const {user, width} = useContext(AuthContext);
    const {fecha} = useParams()
    const [alimentos, setAlimentos] = useState([])
    const BaseUrl = import.meta.env.VITE_API_BASE_ACCIONESALIMENTOS
    const url = `${BaseUrl}id=${user.id}`;
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

    console.log(typeof(alimentos))

    return<>
        <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
                <HeaderPaginaPrincipal fecha={fecha} home= {true}/>
        </Contenedor>
        
    <main>
        <section className="container pt-4">
            <Link className="btn btn-primary" to={`/FormulaioAgregarAlimentos/${fecha}`}>Agregar</Link>
        </section>
        
        {width <= 992 ?<section className={`${styles.contenedorMovil} mt-3`}>
            {Array.isArray(alimentos) ? alimentos.map((alimento, index) => (
                <div className={`${styles.descripcion}`} key={index}>
                    <div className={`${styles.nombrePorcion}`}>
                        <p className="fw-bold">{alimento.nombreAlimento}</p>
                        <p>Calorias: <span className="text-primary">{alimento.calorias}</span></p>
                    </div>

                    <div className="w-50 p-2 d-flex flex-column align-items-center justify-content-center" style={{gap :'5px'}}>
                    <Link className='btn btn-danger w-75' to={`/EliminarAlimentoDelUsuario/${alimento.id}/${fecha}`}> Eliminar </Link>

                    
                    <Link className='btn btn-secondary w-75' to={`/EditarAlimento/${alimento.id}/${fecha}`}>Editar</Link>
                    </div>
                </div>
            )) : ''}
        </section> : width > 992 ?  <section className={`mt-4 container ${styles.contenedorEscritorio}`}>
        {Array.isArray(alimentos) ? <ContenedorAlimentos  aray={alimentos ? alimentos : []} elementos={elmentos} thead={cabeza}/> : <h1 className="text-center mt-4">No hay alimentos</h1>}
        </section> : ''}
    </main>
    </>
}