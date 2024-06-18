import React from 'react';
import { useForm } from 'react-hook-form';
import Contenedor from '../Contenedor/Contenedor';
import CampoInput from '../CampoInput/CampoInput';
import PostUsuario from '../../Datos/PostUsuario';
import {Link} from 'react-router-dom'

export default function FormularioRegistro() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();

    const Contraseña = watch('password')

    const onSubmit = handleSubmit((data) => {
        console.log(data.ConfirmarContraseña)
        const url = 'https://localhost:7051/api/v1/Account/registerUser'
        PostUsuario(url, data)
    })

    return (
    <Contenedor>
        <form onSubmit={onSubmit}>
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

            <div className="mb-3 float-end">
            <button type="submit" className='btn btn-primary'>Registrarme</button>
            </div>
        </form>

        <Link to={'/'}>Login</Link>
    </Contenedor>
);
}

