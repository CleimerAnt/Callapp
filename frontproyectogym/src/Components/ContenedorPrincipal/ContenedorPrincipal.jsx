import { useContext, useEffect, useState } from "react";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { Link, useParams } from "react-router-dom";
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';
import imagen from '../../assets/imagenPerfil.jpg';
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";
import InputFecha from "../InputFecha/InputFecha";
import styles from '../ContenedorPrincipal/ContenedorPrincipal.module.css'


export default function ContenedorPrincipal({fecha}){
    const {user} = useContext(AuthContext)
    const comida = ['Desayuno', 'Almuerzo', 'Cena'];
    const [contenedorFecha, setContenedorFecha] = useState()
    const [contenedor, setContenedor] = useState([]);

    const contenedorUrl = `https://localhost:7051/api/v1/ContenedorAlimentos?id=${user.id}`;

    const obtenerDatosUser = async () => {
        try {
            const response = await getDatosUser(contenedorUrl, user.jwToken);
            setContenedor(response);
        } catch (err) {
            console.log(err);
        }
    };
    
    useEffect(() => {
        obtenerDatosUser();
    }, []);

    useEffect(() => {
        if(contenedor){
            setContenedorFecha(asignarFecha(fecha))
        }    
    }, [fecha])

    function asignarFecha(fechaData) {
        fechaData = new Date(fechaData)

        let datos = contenedor.filter((element) => {
            const fechaElemento = new Date(element.fecha);
            return fechaElemento.toDateString() === fechaData.toDateString();
        });

        return datos
    }
    
    console.log(contenedorFecha)

    const desayuno = Array.isArray(contenedorFecha) ? contenedorFecha.filter(element => element.horario === 'Desayuno').map(element => ({
        ...element,
        funcion: 'Eliminar'
    })) : [];

    const almuerzo = Array.isArray(contenedorFecha) ? contenedorFecha.filter(element => element.horario === 'Almuerzo').map(element => ({
        ...element,
        funcion: 'Eliminar'
    })):  [];

    const cena = Array.isArray(contenedorFecha) ? contenedorFecha.filter(element => element.horario === 'Cena').map(element => ({
        ...element,
        funcion: 'Eliminar',
    })) : [];

    return<>
    <Contenedor elemento="main" margin={'mt-3'}>
            <InputFecha fechas={Array.isArray(contenedor) ? contenedor.map((element) => {
                return element.fecha
            }) : [new Date().toISOString]} />
            <div className="row">
                <section className={`col-12 col-md-9 ${styles.principal} text-black `}>
                    <h3>Desayuno</h3>
                    {desayuno.length === 0 ? <>
                        <h3>No hay contenido</h3>
                        <Link to={`/agregarAlimentos/${comida[0]}/${fecha ?? new Date().toISOString()}`}> Agregar alimentos
</Link>

                    </> :
                        <>
                            <ContenedorAlimentos ancho={'500px'} thead={['Alimento', 'Calorias', 'Acciones']} aray={desayuno} elementos={['nombreAlimento', 'caloriasDelAlimento', 'funcion']} />
                            <Link to={`/agregarAlimentos/${comida[0]}/${fecha}`}>Agregar alimentos</Link>
                        </>
                    }
                    <h3>Almuerzo</h3>
                    {almuerzo.length === 0 ? <>
                        <h3>No hay contenido</h3>
                        <Link to={`/agregarAlimentos/${comida[1]}/${fecha}`}>Agregar alimentos</Link>
                    </> :
                        <>
                            <ContenedorAlimentos ancho={'500px'} thead={['Alimento', 'Calorias', 'Acciones']} aray={almuerzo} elementos={['nombreAlimento', 'caloriasDelAlimento', 'funcion']} />
                            <Link to={`/agregarAlimentos/${comida[1]}/${fecha}`}>Agregar alimentos</Link>
                        </>
                    }
                    <h3>Cena</h3>
                    {cena.length === 0 ? <>
                        <h3>No hay contenido</h3>
                        <Link to={`/agregarAlimentos/${comida[2]}/${fecha}`}>Agregar alimentos</Link>
                    </> :
                        <>
                            <ContenedorAlimentos
                                elementos={['nombreAlimento', 'caloriasDelAlimento', 'funcion']}
                                ancho={'500px'}
                                thead={['Alimento', 'Calorias', 'Acciones']}
                                aray={cena}
                                
                            />
                            <Link to={`/agregarAlimentos/${comida[2]}/${fecha}`}>Agregar alimentos</Link>
                        </>
                    }
                </section>
            </div>
        </Contenedor>
    </>
}