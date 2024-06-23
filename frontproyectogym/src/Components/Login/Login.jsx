import Contenedor from '../Contenedor/Contenedor'
import CampoInput from '../CampoInput/CampoInput'
import {useForm} from 'react-hook-form'
import postUsuario from '../../Datos/PostUsuario'
import {Link} from 'react-router-dom'
import styles from '../Login/Login.module.css'
import { useContext, useEffect } from 'react'
import BotonForm from '../BotonForm/BotonForm'
import { AuthContext } from '../../Auth/AuthContext'

export default function Login()
{
    const {register, formState: {errors}, handleSubmit} = useForm()
    const {user ,setUser} = useContext(AuthContext);

    const onsubmit = handleSubmit(async(data) =>{
        const url = 'https://localhost:7051/api/v1/Account/authenticate'
        
        try {
            const result = await postUsuario(url, data);
            setUser(result);
        } catch (error) {
            console.error('Error al autenticar:', error);
        }
        });

    return<Contenedor center={'d-flex align-items-center justify-content-center'} >     
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
            <Link  to={'/Registro'}>Registrarme</Link>
        </div>
        
    </form>    
</Contenedor>
}

