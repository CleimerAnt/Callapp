import CampoInput from '../CampoInput/CampoInput';
import { useForm } from 'react-hook-form';
import { Link, json } from 'react-router-dom';
import styles from '../Login/Login.module.css';
import { useContext, useEffect, useState } from 'react';
import fuegoCalorico from '../../assets/fuegoCalorico.png'
import Contenedor from '../Contenedor/Contenedor'
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
        <Contenedor margin={'d-flex align-items-center flex-column mt-4'}>
            <section className='d-flex flex-column align-items-center justity-content-center mb-3'>
                <img className={styles.fuegoCalorico} src={fuegoCalorico} alt="" />
                <h1 className={`${styles.titulo} mt-2`}>Por favor logueate con tu cuenta</h1>
            </section>

            <form onSubmit={onsubmit} className={`${styles.formulario}`}>
                        <CampoInput 
                        name='email'
                        type='email'
                        label={'Correo Electonico'}
                        register={register}
                        required={true}
                        placeholder={"Micorreo@gmail.com"}
                        errors={errors}
                        /> 
            
                        <CampoInput 
                        name='password'
                        label={'Contraseña'}
                        type='password'
                        register={register}
                        required={true}
                        errors={errors}
                        />

                        <div className='d-flex align-items-center justity-content-center'>
                            <button className={`${styles.boton}`} type='submit'>Loguearme</button>
                        </div>

                        <div className={`d-flex align-items-center justity-content-center  p-3 ${styles.link}`}>
                                <Link className={styles.link} to={'/Registro'}>Desea crear una cuenta?</Link>
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