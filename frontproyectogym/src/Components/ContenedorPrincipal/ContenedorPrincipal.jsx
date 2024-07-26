import { useContext, useEffect, useState } from "react";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { Link } from "react-router-dom";
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";
import InputFecha from "../InputFecha/InputFecha";
import styles from '../ContenedorPrincipal/ContenedorPrincipal.module.css'
import ContenedorFechas from "../ContenedorFechas/ContenedorFechas";
import BarraValores from "../BarraValores/BarraValores";

export default function ContenedorPrincipal({ fecha }) {
    const { user } = useContext(AuthContext)
    const comida = ['Desayuno', 'Almuerzo', 'Cena'];
    const [contenedorFecha, setContenedorFecha] = useState([]);
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
        if (contenedor.length > 0) {
            setContenedorFecha(asignarFecha(fecha));
        }
    }, [fecha, contenedor]);

    function asignarFecha(fechaData) {
        fechaData = new Date(fechaData);
        let datos = contenedor.filter((element) => {
            const fechaElemento = new Date(element.fecha);
            return fechaElemento.toDateString() === fechaData.toDateString();
        });
        return datos;
    }

    console.log(contenedorFecha);

    const desayuno = contenedorFecha.filter(element => element.horario === 'Desayuno').map(element => ({
        ...element,
        funcion: 'Eliminar'
    }));

    const almuerzo = contenedorFecha.filter(element => element.horario === 'Almuerzo').map(element => ({
        ...element,
        funcion: 'Eliminar'
    }));

    const cena = contenedorFecha.filter(element => element.horario === 'Cena').map(element => ({
        ...element,
        funcion: 'Eliminar',
    }));

    const calculoValores = (arreglo = [], key) => {
        let valor = 0;

        arreglo.forEach((element) => {
            valor += element[key]
        })

        return valor;
    }

    console.log(calculoValores(desayuno, 'proteinaDelAlimento'))

    return <>
        <Contenedor elemento="main" margin={'mt-2'}>
            <ContenedorFechas />
            <div className={`${styles.contenedor} mt-2`}>
                <section className={`col-12 col-md-9 ${styles.principal} text-black `}>
                    <div className={`${styles.titulo}`}>
                        <h4>Desayuno</h4>
                    </div>
                    {desayuno.length === 0 ? <>
                        <h3>No hay contenido</h3>
                        <div className={`${styles.link}`}>
                        <Link to={`/agregarAlimentos/${comida[0]}/${fecha ?? new Date().toISOString()}`}> Agregar alimentos</Link>
                        </div>
                        
                    </> :
                        <>
                            <ContenedorAlimentos ancho={'600px'} thead={['Alimento', 'Calorias', 'Acciones']} aray={desayuno} elementos={['nombreAlimento', 'caloriasDelAlimento', 'funcion']} />
                            <div className={`${styles.link}`}>
                                <Link to={`/agregarAlimentos/${comida[0]}/${fecha}`}>Agregar alimentos</Link>
                                <BarraValores 
                                proteina={calculoValores(desayuno, 'proteinaDelAlimento')}
                                carbohidratos={calculoValores(desayuno, 'caloriasDelAlimento')}
                                grasas={calculoValores(desayuno, 'grasaDelAlimento')}
                                calorias={calculoValores(desayuno, 'caloriasDelAlimento')}
                                />
                            </div>
                        </>
                    }
                    <div className={`${styles.titulo}`}>
                        <h4>Almuerzo</h4>
                    </div>
                    {almuerzo.length === 0 ? <>
                        <h3>No hay contenido</h3>
                        <div className={`${styles.link}`}>
                            <Link to={`/agregarAlimentos/${comida[1]}/${fecha}`}>Agregar alimentos</Link>
                        </div>
                    </> :
                        <>
                            <ContenedorAlimentos ancho={'600px'} thead={['Alimento', 'Calorias', 'Acciones']} aray={almuerzo} elementos={['nombreAlimento', 'caloriasDelAlimento', 'funcion']} />
                            <div className={`${styles.link}`}>
                            <Link to={`/agregarAlimentos/${comida[1]}/${fecha}`}>Agregar alimentos</Link>
                            <BarraValores 
                                proteina={calculoValores(almuerzo, 'proteinaDelAlimento')}
                                carbohidratos={calculoValores(almuerzo, 'caloriasDelAlimento')}
                                grasas={calculoValores(almuerzo, 'grasaDelAlimento')}
                                calorias={calculoValores(almuerzo, 'caloriasDelAlimento')}
                                />
                        </div>
                        </>
                    }
                    <div className={`${styles.titulo}`}>
                        <h4>Cena</h4>
                    </div>
                    {cena.length === 0 ? <>
                        <h3>No hay contenido</h3>
                        <div className={`${styles.link}`}>
                            <Link to={`/agregarAlimentos/${comida[2]}/${fecha}`}>Agregar alimentos</Link>
                        </div>
                        
                    </> :
                        <>
                            <ContenedorAlimentos
                                elementos={['nombreAlimento', 'caloriasDelAlimento', 'funcion']}
                                ancho={'600px'}
                                thead={['Alimento', 'Calorias', 'Acciones']}
                                aray={cena}
                                
                            />
                            <div className={`${styles.link}`}>
                                <Link to={`/agregarAlimentos/${comida[2]}/${fecha}`}>Agregar alimentos</Link>
                                <BarraValores 
                                proteina={calculoValores(cena, 'proteinaDelAlimento')}
                                carbohidratos={calculoValores(cena, 'caloriasDelAlimento')}
                                grasas={calculoValores(cena, 'grasaDelAlimento')}
                                calorias={calculoValores(cena, 'caloriasDelAlimento')}
                                /> 
                            </div>
                            
                        </>
                    }
                </section>
            </div>
        </Contenedor>
    </>
}
