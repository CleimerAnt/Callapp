import React from 'react';
import { useForm } from 'react-hook-form';
import Contenedor from '../Contenedor/Contenedor';
import CampoInput from '../CampoInput/CampoInput';
import PostUsuario from '../../Datos/PostUsuario';
import {Link, useNavigate} from 'react-router-dom'
import styles from '../FormularioRegistro/FormularioRegistro.module.css'
import BotonForm from '../BotonForm/BotonForm';

export default function FormularioRegistro() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const Contraseña = watch('password')

    const onSubmit = handleSubmit((data) => {
        console.log(data.ConfirmarContraseña)
        const url = 'https://localhost:7051/api/v1/Account/registerUser'
        PostUsuario(url, data)
    })

    return (
    <Contenedor center={'d-flex align-items-center justify-content-center mb-5'}>
        <form className={`${styles.formulario} mt-5 d-flex flex-column `} onSubmit={onSubmit}>
            <CampoInput 
            name='PrimerNombre'
            type='text'
            label='Primer Nombre'
            register={register}
            required={true}
            errors={errors}
            placeholder={'Primer Nombre'}
            />

            <CampoInput 
            name='apellido'
            type='text'
            label='Apellido'
            register={register}
            required={true}
            errors={errors}
            placeholder={'Apellido'}
            />

            <CampoInput 
            name='email'
            type='email'
            label='Correo Electronico'
            register={register}
            required={true}
            errors={errors}
            placeholder={'Correo Electronico'}
            />
            
            <CampoInput 
            name='userName'
            type='text'
            label='Nombre de Usuario'
            register={register}
            required={true}
            errors={errors}
            placeholder={'Nombre de Usuario'}
            />

            <CampoInput 
            name='password'
            type='password'
            label='Contraseña'
            register={register}
            required={true}
            errors={errors}
            placeholder={'Contraseña'}
            />

            <CampoInput 
            name='ConfirmarContraseña'
            type='password'
            label='Confirmar Contraseña'
            register={register}
            required={true}
            errors={errors}
            placeholder={'Confirmar Contraseña'}
            validate={value => value === Contraseña || 'Las Contraseñas no coinciden'}
            />

            <BotonForm tipoBoton={'btn btn-primary'} texto='Registrarme'/>

            <div className={`d-flex align-items-end p-3 ${styles.link}`}>
                <Link  to={'/'}>Loguearme</Link>
            </div>
        </form>

    </Contenedor>
);
}

