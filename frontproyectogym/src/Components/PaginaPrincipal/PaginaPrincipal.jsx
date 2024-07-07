import { useContext, useEffect, useState } from "react";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { useNavigate } from "react-router-dom";
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';
import styles from './PaginaPrincipal.module.css';
import imagen from '../../assets/imagenPerfil.jpg';
import Perfil from "../Perfil/Perfil";
import ContenedorAlimentos from "../ContenedorAlimentos/ContenedorAlimentos";


export default function PaginaPrincipal() {
    const { user } = useContext(AuthContext);
    const [state, setState] = useState();
    const [calorias, setCalorias] = useState(0);
    const [contenedor, setContenedor] = useState([]);

    console.log("usuario", user);
    const navigate = useNavigate();
    const url = `https://localhost:7051/api/v1/Usuario/ObtenerUsuarios?id=${user.id}`;
    
    useEffect(() => {
        getDatosUser(url, user.jwToken)
            .then(res => {
                console.log(res);
                setCalorias(Math.round(res.calorias))
            })
            .catch(err => {
                console.log('error: ', err);
                return null;
            });
    }, [url]);
    
    let imagenPerfil = '';

    if (user.imgUrl === '') {
        imagenPerfil = imagen;
    } else {
        imagenPerfil = `https://localhost:7051${user.imgUrl}`;
    }

    useEffect(() => {
        if (state === 204) {
            navigate('/FormularioCalorias');
        }
    }, [state, navigate]);

    useEffect(() => {
        const url = `https://localhost:7051/api/v1/ContenedorAlimentos?id=${user.id}`
        getDatosUser(url, user.jwToken)
            .then(res => {
                setContenedor(res)
            })
            .catch(err => console.error('Ha ocurrido un error: ', err))
    }, [url])
    console.log('Contenedor: ',contenedor)
    let desayuno = [];
    let almuerzo = [];
    let cena = [];
    if(contenedor.status === 204){
        console.log(contenedor)
    }
    else{
    contenedor.forEach(element => {
        if(element.horario === 'Desayuno'){
            desayuno.push(element)
        }
        if(element.horario === 'Almuerzo'){
            almuerzo.push(element)
        }
        if(element.horario === 'Cena'){
            cena.push(element)
        }
    });
    }

    return (
        <Contenedor elemento="main" margin={'mt-3'}>
            <div className="row">
                <section className="col-12 col-md-3">
                    <Perfil calorias={calorias} imagenPerfil={imagenPerfil} />
                </section>
                <section className={`col-12 col-md-9 ${styles.principal} text-black `}>
                    <h1>Pagina Principal</h1>
                    <h3>Desayuno</h3>
                    {contenedor.status === 204 ? 'No hay contenido'  : <ContenedorAlimentos aray={desayuno}/>
                    }
                    <h3>Almuerzo</h3>
                    {contenedor.status === 204 ? 'No hay contenido' : <ContenedorAlimentos aray={almuerzo}/> 
                    
                    }
                    <h3>Cena</h3>
                    {contenedor.status === 204 ? 'No hay contenido' : <ContenedorAlimentos aray={cena}/> 
                    
                    }
                </section>
            </div>
        </Contenedor>
    );
}

