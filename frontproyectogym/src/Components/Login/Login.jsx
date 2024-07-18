import Contenedor from '../Contenedor/Contenedor';
import CampoInput from '../CampoInput/CampoInput';
import { useForm } from 'react-hook-form';
import { Link, json } from 'react-router-dom';
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
            const result = await login(url, data);
            console.log(result)
            setUser(result);
            setHasAuthenticated(true); 
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
            setHasAuthenticated(false);
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


const login = async (url, data) => {
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error al realizar el Login:', errorText);
            throw new Error('Error al realizar el Login');
        }

        return await response.json();
    } catch (err) {
        console.error('Error: ', err);
        throw err;
    }
};