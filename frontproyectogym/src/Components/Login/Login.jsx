import Contenedor from '../Contenedor/Contenedor';
import CampoInput from '../CampoInput/CampoInput';
import { useForm } from 'react-hook-form';
import postUsuario from '../../Datos/PostUsuario';
import { Link } from 'react-router-dom';
import styles from '../Login/Login.module.css';
import { useContext, useEffect, useState } from 'react';
import BotonForm from '../BotonForm/BotonForm';
import { AuthContext } from '../../Auth/AuthContext';
import swal from 'sweetalert';

export default function Login() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user, setUser } = useContext(AuthContext);
    const [hasAuthenticated, setHasAuthenticated] = useState(false);

    const onsubmit = handleSubmit(async (data) => {
        const url = 'https://localhost:7051/api/v1/Account/authenticate';
        
        try {
            const result = await postUsuario(url, data);
            setUser(result);
            setHasAuthenticated(true); // Indica que se ha realizado una autenticación
        } catch (error) {
            console.error('Error al autenticar:', error);
        }
    });

    useEffect(() => {
        if (hasAuthenticated) {
            if (user !== null) {
                if (user.hasError === true) {
                    swal("Error:", user.error, "error");
                } else if (user.isVerified === false) {
                    swal("Aviso", "Su Cuenta no esta activada", "warning");
                }
            }
            setHasAuthenticated(false); // Resetea el estado después de manejar la autenticación
        }
    }, [user, hasAuthenticated]);

    return (
        <Contenedor center={'d-flex align-items-center justify-content-center'}>
            <form onSubmit={onsubmit} className={`${styles.formulario} mt-5 d-flex flex-column `}>
                <CampoInput 
                    name='email'
                    type='email'
                    label='Correo Electronico'
                    register={register}
                    required={true}
                    placeholder={"Nombre de Usuario"}
                    errors={errors}
                />

                <CampoInput 
                    name='password'
                    type='password'
                    placeholder={"Contraseña"}
                    label='Contraseña'
                    register={register}
                    required={true}
                    errors={errors}
                />

                <BotonForm tipoBoton={'btn btn-primary'} texto='Loguearme'/>

                <div className={`d-flex align-items-end p-3 ${styles.link}`}>
                    <Link to={'/Registro'}>Registrarme</Link>
                </div>
            </form>    
        </Contenedor>
    );
}
