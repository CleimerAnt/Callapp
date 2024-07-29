import React from 'react';
import { useForm } from 'react-hook-form';
import Contenedor from '../Contenedor/Contenedor';
import CampoInput from '../CampoInput/CampoInput';
import postUsuario from '../../Datos/PostUsuario';
import { Link } from 'react-router-dom';
import styles from '../FormularioRegistro/FormularioRegistro.module.css';
import BotonForm from '../BotonForm/BotonForm';
import swal from 'sweetalert';

export default function FormularioRegistro() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmit = handleSubmit(async (data) => {
        const url = 'https://localhost:7051/api/v1/Account/registerUser';

        // Imprime los datos que se van a enviar
        console.log('Datos del formulario:', data);

        // Asegúrate de que el archivo está presente
        const formData = new FormData();
        for (const key in data) {
            formData.append(key, data[key]);
        }
        if (data.file && data.file[0]) {
            formData.append('file', data.file[0]);
        } else {
            console.error('El archivo es obligatorio');
            return;
        }

        try {
            const res = await postUsuario(url, formData);
            console.log(await res); 
            if(await res.hasError === false){
                swal("Aviso", "Usuario registrado exitosamente", "success");            
            }
            else{
                swal("Aviso", `${res.error}`, "warning")
            }
        } catch (error) {
            console.error('Error al registrar usuario:', error);
        }
    });

    return (
        <main className={styles.main} margin={'mt-5'}>
    <section className={`${styles.contenedor} mt-5`}>
        <form encType="multipart/form-data" className={`${styles.formulario}`} onSubmit={onSubmit}>
            <i className={`fa-solid fa-egg ${styles.huevo}`}></i>
            <CampoInput
                name='PrimerNombre'
                type='text'
                label='Primer Nombre'
                register={register}
                required={true}
                errors={errors}
                placeholder='Primer Nombre'
            />
            <CampoInput
                name='Apellido'
                type='text'
                label='Apellido'
                register={register}
                required={true}
                errors={errors}
                placeholder='Apellido'
            />
            <CampoInput
                name='Email'
                type='email'
                label='Correo Electrónico'
                register={register}
                required={true}
                errors={errors}
                placeholder='Correo Electrónico'
            />
            <CampoInput
                name='UserName'
                type='text'
                label='Nombre de Usuario'
                register={register}
                required={true}
                errors={errors}
                placeholder='Nombre de Usuario'
            />
            <CampoInput
                name='file'
                type='file'
                label='Foto de Perfil'
                register={register}
                required={true}
                errors={errors}
                placeholder='Foto de Perfil'
            />
            <CampoInput
                name='Password'
                type='password'
                label='Contraseña'
                register={register}
                required={true}
                errors={errors}
                placeholder='Contraseña'
            />
            <CampoInput
                name='ConfirmarContraseña'
                type='password'
                label='Confirmar Contraseña'
                register={register}
                required={true}
                errors={errors}
                placeholder='Confirmar Contraseña'
                validate={value => value === watch('Password') || 'Las Contraseñas no coinciden'}
            />
            <button className={styles.boton} type='submit'>Registrarme</button>
            <div className={`d-flex align-items-end p-3 ${styles.link}`}>
                <Link to={'/'}>Loguearme</Link>
            </div>
        </form>
    </section>
</main>
    );
}
