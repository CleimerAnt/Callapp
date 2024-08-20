import { useContext, useEffect, useState } from "react";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { Link, useParams, useNavigate } from "react-router-dom";
import HeaderPaginaPrincipal from "../HeaderPaginaPrincipal/HeaderPaginaPrincipal";
import HeaderInicio from '../HeaderInicio/HeaderInicio'
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';
import styles from './PaginaPrincipal.module.css';
import imagen from '../../assets/imagenPerfil.jpg';
import Perfil from "../Perfil/Perfil";
import ContenedorPrincipal from "../ContenedorPrincipal/ContenedorPrincipal";

export default function PaginaPrincipal() {
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();
    let caloriasGenerales = 0;
    const [calorias, setCalorias] = useState(0);
    const [contenedor, setContenedor] = useState([]);
    const {fecha} = useParams()

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

    let contenedorFecha;
    function asignarFecha(fecha) {
        fecha = new Date(fecha)

        contenedorFecha = contenedor.filter((element) => {
            const fechaElemento = new Date(element.fecha);
            return fechaElemento.toDateString() === fecha.toDateString();
        });
    }
    
    if(Array.isArray(contenedor)){
        asignarFecha(fecha)
    }

    if(Array.isArray(contenedorFecha)){
    contenedorFecha.forEach(element => {
        caloriasGenerales += element.caloriasDelAlimento;
    });
    }
    console.log('Calorias', calorias)
    

    let porcentaje = (caloriasGenerales / calorias) * 100;

    let porcentajeCalculado = Math.round(porcentaje.toFixed(2));
    console.log('calorias generales', caloriasGenerales)
    return (
        <>
        <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
                <HeaderPaginaPrincipal fecha={fecha} />
        </Contenedor>

        <Contenedor margin="mt-4" elemento="main">
        <div className="container mt-3 ">
            <div className="row">
              {/* Columna izquierda */}
                <div className="col-md-6 mt-2 d-flex justify-content-center">
                    <div style={{ maxWidth: '550px' }}>
                    <div className={`${styles.resumen}`} style={{ borderRadius: '10px' }}>
                        <h3 className="text-white">Tu resumen calórico</h3>
                    </div>
        
                    <div className="mt-2">
                        <Perfil caloriasGenerales={caloriasGenerales} fecha={fecha} porcentajeCalculado={porcentajeCalculado} calorias={calorias} imagenPerfil={imagenPerfil} />
                    </div>
                    </div>
                </div>
    
              {/* Columna derecha */}
            <div className={`col-md-6 ${styles.contenedorPrincipal}`}>
                    <ContenedorPrincipal contenedorFecha={contenedorFecha} fecha={fecha}/>
            </div>
            </div>
        </div>
        </Contenedor>
        </>
        
    );
    }      
