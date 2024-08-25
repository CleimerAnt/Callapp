import { useContext, useEffect, useState } from "react";
import Contenedor from "../Contenedor/Contenedor";
import { AuthContext } from "../../Auth/AuthContext";
import { useParams } from "react-router-dom";
import HeaderPaginaPrincipal from "../HeaderPaginaPrincipal/HeaderPaginaPrincipal";
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';
import styles from './PaginaPrincipal.module.css';
import imagen from '../../assets/imagenPerfil.jpg';
import Perfil from "../Perfil/Perfil";
import ContenedorPrincipal from "../ContenedorPrincipal/ContenedorPrincipal";

export default function PaginaPrincipal() {
    const { user } = useContext(AuthContext);
    let caloriasGenerales = 0;
    const [datosUsuario, setDatosUsuario] = useState();
    const [calorias, setCalorias] = useState(0);
    const [contenedor, setContenedor] = useState([]);
    const {fecha} = useParams()
    const baseUrl = import.meta.env.VITE_API_BASE_URL;
    const userUrl = `${baseUrl}id=${user.id}`;
    const urlContenedor = import.meta.env.VITE_API_BASE_CONTENEDORURL;
    const contenedorUrl = `${urlContenedor}id=${user.id}`;

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
                setDatosUsuario(res)
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

    let imagenPerfil = imagen;

    if(datosUsuario){
        if(datosUsuario.imgUrl !== "" && datosUsuario.imgUrl !== null){
            const BaseUrl = import.meta.env.VITE_API_BASE_IMGURL;
            imagenPerfil = `${BaseUrl}${datosUsuario.imgUrl}`;
        }else{
            imagenPerfil = imagen;
        }
    }

    

    console.log('Datos Usuario', datosUsuario)
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
    <div className="container mt-3">
        <div className="row">
            {/* Columna izquierda */}
            <div className="col-lg-6 col-md-12 mt-2 d-flex justify-content-center">
                <div style={{ maxWidth: '550px', width: '100%' }}>
                    <div className={`${styles.resumen}`}>
                        <h3 className="text-white">Tu resumen calórico</h3>
                    </div>
                    <div className="mt-2">
                        <Perfil 
                            usuario={datosUsuario} 
                            caloriasGenerales={caloriasGenerales} 
                            fecha={fecha} 
                            porcentajeCalculado={porcentajeCalculado} 
                            calorias={calorias} 
                            imagenPerfil={imagenPerfil} 
                        />
                    </div>
                </div>
            </div>

            {/* Columna derecha */}
            <div className={`col-lg-6 col-md-12 ${styles.contenedorPrincipal}`}>
                <ContenedorPrincipal contenedorFecha={contenedorFecha} fecha={fecha} />
            </div>
        </div>
    </div>
</Contenedor>
        </>
        
    );
    }      
