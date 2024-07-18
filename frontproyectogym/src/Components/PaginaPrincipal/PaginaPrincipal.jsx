import { useContext, useEffect, useState } from "react";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';
import styles from './PaginaPrincipal.module.css';
import imagen from '../../assets/imagenPerfil.jpg';
import Perfil from "../Perfil/Perfil";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";

export default function PaginaPrincipal() {
    const { user } = useContext(AuthContext);
    const comida = ['Desayuno', 'Almuerzo', 'Cena'];
    const [calorias, setCalorias] = useState(0);
    const [contenedor, setContenedor] = useState([]);

    const userUrl = `https://localhost:7051/api/v1/Usuario/ObtenerUsuarios?id=${user.id}`;
    const contenedorUrl = `https://localhost:7051/api/v1/ContenedorAlimentos?id=${user.id}`;

    const obtenerDatosUser = async () => {
        try {
            const response = await getDatosUser(contenedorUrl, user.jwToken);
            setContenedor(response);
        } catch (err) {
            console.log(err);
        }
    };
    

    const datosUser = async () => {
            try{
                const res = await getDatosUser(userUrl, user.jwToken)
                setCalorias(Math.round(res.calorias));
            }
            catch(error){
                console.log(error)
            }
    };

    useEffect(() => {
        datosUser();
    }, []);

    useEffect(() => {
        obtenerDatosUser();
    }, []);

    let imagenPerfil = user.imgUrl === '' ? imagen : `https://localhost:7051${user.imgUrl}`;


    const desayuno = Array.isArray(contenedor) ? contenedor.filter(element => element.horario === 'Desayuno').map(element => ({
        ...element,
        funcion: 'Eliminar'
    })) : [];

    const almuerzo = Array.isArray(contenedor) ? contenedor.filter(element => element.horario === 'Almuerzo').map(element => ({
        ...element,
        funcion: 'Eliminar'
    })):  [];

    const cena = Array.isArray(contenedor) ? contenedor.filter(element => element.horario === 'Cena').map(element => ({
        ...element,
        funcion: 'Eliminar'
    })) : [];

    const handleDelete = async () => {
        await obtenerDatosUser();
    };
    console.log(contenedor)
    return (
        <Contenedor elemento="main" margin={'mt-3'}>
            <div className="row">
                <section className="col-12 col-md-3">
                    <Perfil calorias={calorias} imagenPerfil={imagenPerfil} />
                </section>
                <section className={`col-12 col-md-9 ${styles.principal} text-black `}>
                    <h1>Pagina Principal</h1>
                    <h3>Desayuno</h3>
                    {desayuno.length === 0 ? <>
                        <h3>No hay contenido</h3>
                        <Link to={`/agregarAlimentos/${comida[0]}`}>Agregar alimentos</Link>
                    </> :
                        <>
                            <ContenedorAlimentos onDelete={handleDelete} ancho={'500px'} thead={['Alimento', 'Calorias', 'Acciones']} aray={desayuno} elementos={['nombreAlimento', 'caloriasDelAlimento', 'funcion']} />
                            <Link to={`/agregarAlimentos/${comida[0]}`}>Agregar alimentos</Link>
                        </>
                    }
                    <h3>Almuerzo</h3>
                    {almuerzo.length === 0 ? <>
                        <h3>No hay contenido</h3>
                        <Link to={`/agregarAlimentos/${comida[1]}`}>Agregar alimentos</Link>
                    </> :
                        <>
                            <ContenedorAlimentos onDelete={handleDelete} ancho={'500px'} thead={['Alimento', 'Calorias', 'Acciones']} aray={almuerzo} elementos={['nombreAlimento', 'caloriasDelAlimento', 'funcion']} />
                            <Link to={`/agregarAlimentos/${comida[1]}`}>Agregar alimentos</Link>
                        </>
                    }
                    <h3>Cena</h3>
                    {cena.length === 0 ? <>
                        <h3>No hay contenido</h3>
                        <Link to={`/agregarAlimentos/${comida[2]}`}>Agregar alimentos</Link>
                    </> :
                        <>
                            <ContenedorAlimentos
                                elementos={['nombreAlimento', 'caloriasDelAlimento', 'funcion']}
                                ancho={'500px'}
                                thead={['Alimento', 'Calorias', 'Acciones']}
                                aray={cena}
                                onDelete={handleDelete}
                            />
                            <Link to={`/agregarAlimentos/${comida[2]}`}>Agregar alimentos</Link>
                        </>
                    }
                </section>
            </div>
        </Contenedor>
    );


}
