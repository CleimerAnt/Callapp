import Contenedor from "../Contenedor/Contenedor";
import { Link } from "react-router-dom";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";
import styles from '../ContenedorPrincipal/ContenedorPrincipal.module.css'
import ContenedorFechas from "../ContenedorFechas/ContenedorFechas";
import BarraValores from "../BarraValores/BarraValores";

export default function ContenedorPrincipal({ fecha, contenedorFecha = [] }) {
    const comida = ['Desayuno', 'Almuerzo', 'Cena'];

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

        return Math.round(valor)
    }

    console.log(contenedorFecha)

    return <>
        <Contenedor elemento="main" margin={'mt-2'}>
            <ContenedorFechas />
            <div className={`${styles.contenedor} mt-2`}>
                <section className={`col-12 col-md-9 ${styles.principal} text-black `}>
                    <div className={`${styles.titulo}`}>
                        <h4>Desayuno</h4>
                    </div>
                    {desayuno.length === 0 ? <>
                        <h3>No hay alimentos</h3>
                        <div className={`${styles.link}`}>
                        <Link to={`/agregarAlimentos/${comida[0]}/${fecha ?? new Date().toISOString()}`}> Agregar alimentos</Link>
                        </div>
                        
                    </> :
                        <>
                            <ContenedorAlimentos ancho={'600px'} thead={['Alimento', 'Calorias', 'Porcion' ,'Acciones']} aray={desayuno} elementos={['nombreAlimento', 'caloriasDelAlimento', 'porcion','funcion']} />
                            <div className={`${styles.link}`}>
                                <Link to={`/agregarAlimentos/${comida[0]}/${fecha}`}>Agregar alimentos</Link>
                                <BarraValores 
                                proteina={calculoValores(desayuno, 'proteinaDelAlimento')}
                                carbohidratos={calculoValores(desayuno, 'carbohidratosDelAlimento')}
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
                        <h3>No hay alimentos</h3>
                        <div className={`${styles.link}`}>
                            <Link to={`/agregarAlimentos/${comida[1]}/${fecha}`}>Agregar alimentos</Link>
                        </div>
                    </> :
                        <>
                            <ContenedorAlimentos ancho={'600px'} thead={['Alimento', 'Calorias', 'Porcion' ,'Acciones']} aray={almuerzo} elementos={['nombreAlimento', 'caloriasDelAlimento', 'porcion','funcion']} />
                            <div className={`${styles.link}`}>
                            <Link to={`/agregarAlimentos/${comida[1]}/${fecha}`}>Agregar alimentos</Link>
                            <BarraValores 
                                proteina={calculoValores(almuerzo, 'proteinaDelAlimento')}
                                carbohidratos={calculoValores(desayuno, 'carbohidratosDelAlimento')}
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
                        <h3>No hay alimentos</h3>
                        <div className={`${styles.link}`}>
                            <Link to={`/agregarAlimentos/${comida[2]}/${fecha}`}>Agregar alimentos</Link>
                        </div>
                        
                    </> :
                        <>
                            <ContenedorAlimentos
                                elementos={['nombreAlimento', 'caloriasDelAlimento', 'porcion','funcion']}
                                ancho={'600px'}
                                thead={['Alimento', 'Calorias', 'Porcion' ,'Acciones']}
                                aray={cena}
                                
                            />
                            <div className={`${styles.link}`}>
                                <Link to={`/agregarAlimentos/${comida[2]}/${fecha}`}>Agregar alimentos</Link>
                                <BarraValores 
                                proteina={calculoValores(cena, 'proteinaDelAlimento')}
                                carbohidratos={calculoValores(desayuno, 'carbohidratosDelAlimento')}
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
