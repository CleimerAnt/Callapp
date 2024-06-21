import React from 'react';
import { useForm } from 'react-hook-form';
import Contenedor from '../Contenedor/Contenedor';
import CampoInput from '../CampoInput/CampoInput';
import PostUsuario from '../../Datos/PostUsuario';
import {Link, useNavigate} from 'react-router-dom'
import styles from '../FormularioRegistro/FormularioRegistro.module.css'
import { AuthContext } from '../../Auth/AuthContext';
import { useContext, useEffect } from 'react';
import BotonForm from '../BotonForm/BotonForm';

export default function FormularioRegistro() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    useEffect(()=>{
        if(user){
            navigate('/PaginaPrincipal')
        }
    }, [user])

    const Contraseña = watch('password')

    const onSubmit = handleSubmit((data) => {
        console.log(data.ConfirmarContraseña)
        const url = 'https://localhost:7051/api/v1/Account/registerUser'
        PostUsuario(url, data)
    })

    return (
    <Contenedor>
        <form className={styles.formulario} onSubmit={onSubmit}>
            <CampoInput 
            name='PrimerNombre'
            type='text'
            label='Primer Nombre'
            register={register}
            required={true}
            errors={errors}
            />

            <CampoInput 
            name='apellido'
            type='text'
            label='Apellido'
            register={register}
            required={true}
            errors={errors}
            />

            <CampoInput 
            name='email'
            type='email'
            label='Correo Electronico'
            register={register}
            required={true}
            errors={errors}
            />
            
            <CampoInput 
            name='userName'
            type='text'
            label='Nombre de Usuario'
            register={register}
            required={true}
            errors={errors}
            />

            <CampoInput 
            name='password'
            type='password'
            label='Contraseña'
            register={register}
            required={true}
            errors={errors}
            />

            <CampoInput 
            name='ConfirmarContraseña'
            type='password'
            label='Confirmar Contraseña'
            register={register}
            required={true}
            errors={errors}
            validate={value => value === Contraseña || 'Las Contraseñas no coinciden'}
            />

            <BotonForm texto='Registrarme'/>
        </form>

        <Link to={'/'}>Login</Link>
    </Contenedor>
);
}

