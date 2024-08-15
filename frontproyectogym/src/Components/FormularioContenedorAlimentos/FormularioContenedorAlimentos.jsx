import { AuthContext } from "../../Auth/AuthContext";
import Contenedor from '../Contenedor/Contenedor';
import FormularioAgregarAlimentos from "../FormularioAgregarAlimentos/FormularioAgregarAlimentos";
import styles from '../FormularioContenedorAlimentos/FormularioContenedorAlimentos.module.css';
import { Link, useParams } from "react-router-dom";
import HeaderPaginaPrincipal from "../HeaderPaginaPrincipal/HeaderPaginaPrincipal";
import { useContext, useEffect, useState } from "react";
import getDatosUser from "../../Datos/ObtenerCalculoCalorias";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";

export default function FormularioContenedorAlimentos() {
    const { fecha } = useParams();
    const [alimentos, setAlimentos] = useState([]);
    const { comida } = useParams();
    const camposAlimentos = ['nombreAlimento', 'carbohidratos', 'proteina', 'grasa', 'calorias', 'descripcion', 'funcion'];
    const { user } = useContext(AuthContext);

    const url = `https://localhost:7051/api/v1/Alimentos/Obtener Alimentos?id=${user.id}`;

    useEffect(() => {
        getDatosUser(url, user.jwToken)
            .then(res => {
                setAlimentos(res);
            })
            .catch(err => console.error(err));
    }, [url, user]);

    if (alimentos.status === 204) {
        return (
            <>
                <main className={styles.main}>
                    <h1 className="text-center pt-2">No hay alimentos</h1>
                    <Link className={`${styles.link}`} to={`/accionesAlimentos/${fecha}`}>Pulse aquí para agregar</Link>
                </main>
            </>
        );
    }

    alimentos.forEach((element) => {
        element.funcion = 'funcion';
        element.horaio = comida;
        element.eliminar = 'eliminar';
    });

    console.log('Contenedor Alimentos');
    return (
        <>
            <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
                <HeaderPaginaPrincipal fecha={fecha} home= {true}/>
        </Contenedor>

            <main className="pt-4" style={{ backgroundColor: '#F1F1F1', height: '90vh' }}>
                <section className={`container ${styles.contenedorEscritorio}`}>
                    <ContenedorAlimentos fecha={fecha} elementos={camposAlimentos} thead={['Nombre del Alimento', 'Carbohidratos', 'Proteina', 'Grasa', 'Calorias', 'Descripcion', 'Acciones']} aray={alimentos} />
                </section>


                <article className={`${styles.contenedorMovil} mt-3`}>
            {alimentos.map((alimento, index) => (
                <div className={`${styles.descripcion}`} key={index}>
                    <div className={`${styles.nombrePorcion}`}>
                        <p className="fw-bold">{alimento.nombreAlimento}</p>
                        <p>Calorias: <span className="text-primary">{alimento.calorias}</span></p>
                    </div>

                    <div className="w-50 p-2 d-flex  align-items-center justify-content-center" style={{gap :'5px'}}>
                    <FormularioAgregarAlimentos 
                                                id={alimento.id} 
                                                userId={alimento.id} 
                                                comida={alimento.horaio} 
                                                grafica={[alimento.proteina, alimento.carbohidratos, alimento.grasa]}
                                                fecha={fecha}
                                            />

                    </div>
                </div>
            ))}
        </article>
            </main>
        </>
    );
}
