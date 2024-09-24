import CampoInput from '../CampoInput/CampoInput';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import HeaderInicio from '../HeaderInicio/HeaderInicio';
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';
import styles from '../Login/Login.module.css';
import { useContext, useEffect, useState } from 'react';
import fuegoCalorico from '../../assets/fuegoCalorico.png';
import Contenedor from '../Contenedor/Contenedor';
import { AuthContext } from '../../Auth/AuthContext';
import swal from 'sweetalert';
import login from '../../Datos/Login';

export default function Login() {
const { register, formState: { errors }, handleSubmit } = useForm();
const { user, setUser,fechaIso } = useContext(AuthContext);
const [hasAuthenticated, setHasAuthenticated] = useState(false);
const navigate = useNavigate();

const onsubmit = handleSubmit(async (data) => {
    const url = import.meta.env.VITE_API_BASE_LOGIN;
    try {

        swal({
            title: "Cargando...",
            text: "Espere mientras procesamos su autenticación",
            icon: "info",
            buttons: false,
            closeOnClickOutside: false,
        });

        const result = await login(url, data);
        setUser(result);
        setHasAuthenticated(true);      
        localStorage.setItem('user', JSON.stringify(result));

        swal.close();

    } catch (error) {
        console.error('Error al autenticar:', error);
        swal.close();
        swal("Error", "Hubo un problema con el login", "error");
        return error;
    }
});




useEffect(() => {
    if (hasAuthenticated) {
        if (user !== null) {
            if (user.hasError === false) {
                const baseUrl = import.meta.env.VITE_API_BASE_URL;
                const url = `${baseUrl}id=${user.id}`;

                async function getCalorias(){
                    const response = await getDatosUser(url, user.jwToken);
                    const data = await response;
                    if(data.status === 204){
                        navigate('/FormularioCalorias');
                    } else {
                        navigate(`/PaginaPrincipal/${fechaIso()}`);
                    }
                }
                getCalorias();

            } else if (user.hasError === true) {
                swal("Error:", user.error, "error");
            } else if (user.isVerified === false) {
                swal("Aviso", "Su Cuenta no está activada", "warning");
            }
        }
        setHasAuthenticated(false);
    }
}, [user, hasAuthenticated]);

    return (
        <>
    <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center '}>
        <HeaderInicio home={true} />
    </Contenedor>

    <main className={`container-fluid ${styles.main} d-flex align-items-center flex-column mt-4`}>
        <section className='d-flex flex-column align-items-center justify-content-center mb-3 mt-4'>
            <img className={styles.fuegoCalorico} src={fuegoCalorico} alt="Fuego Calórico Logo" />
            <h1 className={`${styles.titulo} mt-2`}>Por favor, inicia sesión con tu cuenta</h1>
        </section>

        <section>
            <form onSubmit={onsubmit} className={`${styles.formulario}`}>
                <CampoInput 
                    name='email'
                    type='email'
                    label={'Correo Electrónico'}
                    register={register}
                    autocomplete="email"
                    required={true}
                    placeholder={"micorreo@gmail.com"}
                    errors={errors}
                /> 

                <CampoInput 
                    name='password'
                    label={'Contraseña'}
                    type='password'
                    register={register}
                    required={true}
                    autocomplete="current-password"
                    errors={errors}
                />

                <div className='d-flex align-items-center mt-4 justify-content-center'>
                    <button className={`${styles.boton}`} type='submit'>Iniciar sesión</button>
                </div>

                <div className={`d-flex align-items-center justify-content-center p-3 ${styles.link}`}>
                    <Link className={styles.link} to={'/Registro'}>¿Deseas crear una cuenta?</Link>
                </div>
            </form> 
        </section>
    </main>
</>        
);
}

