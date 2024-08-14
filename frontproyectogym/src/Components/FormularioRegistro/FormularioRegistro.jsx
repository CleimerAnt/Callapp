import React from 'react';
import { useForm } from 'react-hook-form';
import Contenedor from '../Contenedor/Contenedor';
import CampoInput from '../CampoInput/CampoInput';
import postUsuario from '../../Datos/PostUsuario';
import HeaderInicio from '../HeaderInicio/HeaderInicio';
import { Link } from 'react-router-dom';
import styles from '../FormularioRegistro/FormularioRegistro.module.css';
import fuegoCalorico from '../../assets/fuegoCalorico.png';
import swal from 'sweetalert';

export default function FormularioRegistro() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const onSubmit = handleSubmit(async (data) => {
        const url = 'https://localhost:7051/api/v1/Account/registerUser';

        console.log('Datos del formulario:', data);

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
        <>
        <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
                <HeaderInicio home= {true}/>
            </Contenedor>

            <main className={`d-flex align-items-center flex-column mt-4 ${styles.main}`}>
            {<section className='d-flex flex-column align-items-center justify-content-center mt-4'>
                
                <h1 className={`${styles.titulo} mt-2`}>Crear una nueva cuenta</h1>
            </section>}
            <form encType="multipart/form-data" className={`${styles.formulario} mt-4`} onSubmit={onSubmit}>
                <CampoInput
                    name='PrimerNombre'
                    type='text'
                    label='Primer Nombre'
                    register={register}
                    required={true}
                    errors={errors}
                    placeholder=''
                />
                <CampoInput
                    name='Apellido'
                    type='text'
                    label='Apellido'
                    register={register}
                    required={true}
                    errors={errors}
                    placeholder=''
                />
                <CampoInput
                    name='Email'
                    type='email'
                    label='Correo Electrónico'
                    register={register}
                    required={true}
                    errors={errors}
                    placeholder=''
                />
                <CampoInput
                    name='UserName'
                    type='text'
                    label='Nombre de Usuario'
                    register={register}
                    required={true}
                    errors={errors}
                    placeholder=''
                />
                <CampoInput
                    name='file'
                    type='file'
                    label='Foto de Perfil'
                    register={register}
                    required={true}
                    errors={errors}
                    placeholder=''
                />
                <CampoInput
                    name='Password'
                    type='password'
                    label='Contraseña'
                    register={register}
                    required={true}
                    errors={errors}
                    placeholder=''
                />
                <CampoInput
                    name='ConfirmarContraseña'
                    type='password'
                    label='Confirmar Contraseña'
                    register={register}
                    required={true}
                    errors={errors}
                    placeholder=''
                    validate={value => value === watch('Password') || 'Las Contraseñas no coinciden'}
                />
                <div className='d-flex align-items-center justify-content-center'>
                    <button className={styles.boton} type='submit'>Registrarme</button>
                </div>
                
                <div className={`d-flex align-items-center p-3 ${styles.link}`}>
                    <Link className={styles.link} to={'/Login'}>Loguearme</Link>
                </div>
            </form>
        </main>
        </>
        
    );
}
