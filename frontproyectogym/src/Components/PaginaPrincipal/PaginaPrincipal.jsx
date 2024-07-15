import { useContext, useEffect, useState } from "react";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';
import styles from './PaginaPrincipal.module.css';
import imagen from '../../assets/imagenPerfil.jpg';
import Perfil from "../Perfil/Perfil";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";

export default function PaginaPrincipal() {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState();
    const comida = ['Desayuno', 'Almuerzo', 'Cena']
    const [calorias, setCalorias] = useState(0);
    const [contenedor, setContenedor] = useState([]);
    const navigate = useNavigate();

    // URL para obtener datos del usuario
    const userUrl = `https://localhost:7051/api/v1/Usuario/ObtenerUsuarios?id=${user.id}`;
    // URL para obtener contenedor de alimentos
    const contenedorUrl = `https://localhost:7051/api/v1/ContenedorAlimentos?id=${user.id}`;

    useEffect(() => {
        getDatosUser(userUrl, user.jwToken)
            .then(res => {
                setCalorias(Math.round(res.calorias));
            })
            .catch(err => {
                console.log('error: ', err);
                return null;
            });
    }, [userUrl, user.jwToken]);

    useEffect(() => {
        getDatosUser(contenedorUrl, user.jwToken)
            .then(res => {
                setContenedor(res);
            })
            .catch(err => console.error('Ha ocurrido un error: ', err));
    }, [contenedorUrl, user.jwToken]);

    let imagenPerfil = user.imgUrl === '' ? imagen : `https://localhost:7051${user.imgUrl}`;

    useEffect(() => {
        if (state === 204) {
            navigate('/FormularioCalorias');
        }
    }, [state, navigate]);

    let desayuno = [];
    let almuerzo = [];
    let cena = [];
    if (contenedor && Array.isArray(contenedor)) {
        contenedor.forEach(element => {
            element.funcion = 'Eliminar'
            if (element.horario === 'Desayuno') {
                desayuno.push(element);
            }
            if (element.horario === 'Almuerzo') {
                almuerzo.push(element);
            }
            if (element.horario === 'Cena') {
                cena.push(element);
            }
        });
    }
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
                    {contenedor.status === 204 ? <>
                    <h3>No hay contenido</h3>
                    <Link to={`/agregarAlimentos/${comida[1]}`}>Agregar alimentos</Link>
                    </> :
                        <>
                            <ContenedorAlimentos ancho={'500px'} thead={['Alimento', 'Calorias', 'Aciones']}  aray={desayuno} elementos={['nombreAlimento', 'caloriasDelAlimento','funcion',]} />
                            <Link to={`/agregarAlimentos/${comida[0]}`}>Agregar alimentos</Link>
                        </>
                    }
                    <h3>Almuerzo</h3>
                    {contenedor.status === 204 ? <>
                        <h3>No hay contenido</h3>
                        <Link to={`/agregarAlimentos/${comida[1]}`}>Agregar alimentos</Link>
                    </> :
                        <>
                            <ContenedorAlimentos ancho={'500px'} thead={['Alimento', 'Calorias', 'Aciones']} aray={almuerzo} elementos={['nombreAlimento', 'caloriasDelAlimento','funcion',]} />
                            <Link to={`/agregarAlimentos/${comida[1]}`}>Agregar alimentos</Link>
                        </>
                    }
                    <h3>Cena</h3>
                    {contenedor.status === 204 ? <>
                    <h3>No hay contenido</h3>
                    <Link to={`/agregarAlimentos/${comida[2]}`}>Agregar alimentos</Link>
                    </> :
                        <>
                            <ContenedorAlimentos
                                elementos={['nombreAlimento', 'caloriasDelAlimento','funcion',]}
                                ancho={'500px'}
                                thead={['Alimento', 'Calorias', 'Aciones']}
                                aray={cena}
                            />
                            <Link to={`/agregarAlimentos/${comida[2]}`}>Agregar alimentos</Link>
                        </>
                    }
                </section>
            </div>
        </Contenedor>
    );
}

