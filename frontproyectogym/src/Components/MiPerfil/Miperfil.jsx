import CampoInput from '../CampoInput/CampoInput'
import { useForm } from 'react-hook-form'
import styles from '../MiPerfil/MiPerfil.module.css'
import imagen from '../../assets/imagenPerfil.jpg';
import ModalReact from '../ModalReact/ModalReact'
import Contenedor from '../Contenedor/Contenedor'
import HeaderPaginaPrincipal from '../HeaderPaginaPrincipal/HeaderPaginaPrincipal'
import { AuthContext } from '../../Auth/AuthContext'
import { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert'
import calcularCalorias from '../../Metodos/CalcularCalorias'
import { Link, useNavigate, useParams } from 'react-router-dom'
import EditarDataAutorizacion from '../../Datos/EditarDataAutorizacion'
import getDatosUser from '../../Datos/ObtenerCalculoCalorias'
import calcularMacronutrientes from '../../Metodos/CalcularMacronutrientes';

export default function MiPerfil(){
    const {register, formState : {errors}, handleSubmit,reset} = useForm()
    const {fecha} = useParams();
    const {user, width} = useContext(AuthContext)
    const [data, setData] = useState();
    const navigate = useNavigate();

    const obtenerDatosUser = async () =>{
        const BaseUrl = import.meta.env.VITE_API_BASE_MIPERFIL;
        const url = `${BaseUrl}id=${user.id}`;
        console.log('Usuario', user)
        try{
            const response = await getDatosUser(url, user.jwToken);
            setData(response);
            console.log(response)
        }
        catch(err){
            throw err;
        }
    }

    useEffect(() => {
        obtenerDatosUser();
    }, [])

    useEffect(() => {
        if (data) {
            if(data.objetivo === 'Perder Peso'){
                data.objetivo = '-500'
            }
            else if(data.objetivo === 'Mantener Peso'){
                data.objetivo = '0'
            }
            else if(data.objetivo === 'Ganar Peso'){
                data.objetivo = '+500'
            }
            else{
                data.objetivo = '0'
            }
            reset({
                Peso: data.peso,
                Altura: data.altura,
                Edad: data.edad,
                Genero: data.genero,
                NivelActividadFisica: data.nivelActividadFisica,
                Objetivo: data.objetivo,
                file: user.ImgUrl,
                PrimerNombre: user.primerNombre,
                Apellido: user.apellido,
                UserName: data ? data.nombreUsuario : ''
            });
        }
    }, [data]);

    const onSubmit = handleSubmit( async (data) => {
        const BaseUrl = import.meta.env.VITE_API_BASE_MIPERFILEDITARDATA;
        const url = `${BaseUrl}id=${user.id}`
        const calorias = calcularCalorias(
            parseFloat(data.Peso),
            parseFloat(data.Altura),
            parseInt(data.Edad),
            parseFloat(data.NivelActividadFisica),
            data.Objetivo,
            data.Genero
        );

        const macronutrientes = calcularMacronutrientes(
            parseFloat(data.Peso),
            parseFloat(data.Altura),
            parseInt(data.Edad),
            parseFloat(data.NivelActividadFisica),
            data.Objetivo,
            data.Genero
        )

        console.log('Macronutrientes: ', macronutrientes.proteinas)

        data.Calorias = calorias;
        data.Proteinas = macronutrientes.proteinas;
        data.Carbohidratos = macronutrientes.carbohidratos;
        data.Grasas = macronutrientes.grasas;
        data.IdentityId = user.id;

        try{
            const response = await EditarDataAutorizacion(url, data, user);
            console.log('Respuesta del servidor', response);

            if(response.status === 200){
                swal({
                    title: "Aviso",
                    text: "Datos actualizados",
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                            closeModal: true
                        }
                    }
                }).then((value) => {
                    if (value) {
                        navigate(`/PaginaPrincipal/${fecha}`);
                    }
                });
            }
            else{
                swal('Aviso', 'Error al actualizar los datos', 'Warning')
            }
        }
        catch(err){
            return err;
        }
    })
    let imagenPerfil = imagen;

    if(data){
        if(data.imgUrl !== "" && data.imgUrl !== null){
            const BaseUrl = import.meta.env.VITE_API_BASE_IMGURL;
            imagenPerfil = `${BaseUrl}${data.imgUrl}`;
            console.log('Imagen de perifl', imagenPerfil)
        }else{
            imagenPerfil = imagen;
        }
        
    }

    const onEdit = handleSubmit ( async (data) => {
        const newData = {
            PrimerNombre: data.PrimerNombre,
            Apellido: data.Apellido,
            UserName: data.UserName,
            file: data.file
        }

        const formData = new FormData();
        for (const key in newData) {
            formData.append(key, newData[key]);
        }
        if (newData.file && newData.file[0]) {
            formData.append('file', newData.file[0]);
        }

        console.log('New Data',formData)
        const BaseUrl = import.meta.env.VITE_API_BASEEDITARPERFILUSUARIO;
        const url = `${BaseUrl}id=${user.id}`;

        try {
            const response = await EditarDataAutorizacion(url, formData, user, true);
            console.log(response)
            if(response.status === 200){
                swal({
                    title: "Aviso",
                    text: "Datos actualizados",
                    icon: "success",
                    buttons: {
                        confirm: {
                            text: "OK",
                            value: true,
                            visible: true,
                            className: "btn btn-primary",
                            closeModal: true
                        }
                    }
                }).then((value) => {
                    if (value) {
                        navigate(`/PaginaPrincipal/${fecha}`);
                    }
                });
            }

        } catch (error) {
            console.error('Ocurrió un error:', error);
            throw error; 
        }

    })

    return<>
        <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
                <HeaderPaginaPrincipal fecha={fecha} home= {true}/>
        </Contenedor>

        <section className = {styles.perfil}>
        {width <= 767 ? <Link  to={`/EditarPerfil/${fecha}`} className='btn btn-secondary mb-4'>Editar perfil</Link> : ''}
            
            <img className={styles.imagen} src={imagenPerfil ? imagenPerfil : imagenPerfilExtra}/>
            <p className='fw-bold mt-3'>{data ? data.nombreUsuario : ''} </p>
        </section>
        
        {width <= 767 ? <main className={`${styles.contenedor}`}>
        <section className={styles.main}>
        <form onSubmit={onSubmit}>
        <CampoInput
            name='Edad'
            label={'Edad'}
            placeholder={'Edad'}
            type='number'
            required={true}
            errors={errors}
            register={register}
        />

        <CampoInput
            name="Genero"
            label={'Genero'}
            placeholder={'Genero'}
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su género' },
                { value: 'masculino', label: 'Hombre' },
                { value: 'femenino', label: 'Mujer' }
            ]}
        />

        <CampoInput
            name='Altura'
            label={'Altura (Pies)'}
            placeholder='Altura'
            type='number'
            decimal={true}
            required={true}
            errors={errors}
            register={register}
        />

        <CampoInput
            name='Peso'
            label={'Peso (LBS)'}
            placeholder='Peso'
            type='number'
            required={true}
            errors={errors}
            register={register}
        />


            <CampoInput
            name="NivelActividadFisica"
            label={'Nivel de actividad fisica'}
            placeholder="Actividad Física"
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su nivel' },
                { value: '1.2', label: 'Sedentario' },
                { value: '1.375', label: 'Ligero (1-3 dias)' },
                { value: '1.55', label: 'Moderado (3-5 dias)' },
                { value: '1.725', label: 'Intenso (6-7 dias)' },
                { value: '1.9', label: 'Muy Intenso' }
            ]}
            />

        <CampoInput
            name="Objetivo"
            label={'Objetivo'}
            placeholder="Objetivo"
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su objetivo ' },
                { value: '-500', label: 'Perder Peso' },
                { value: '0', label: 'Mantener Peso' },
                { value: '+500', label: 'Ganar Peso' }
            ]}
        />

    <CampoInput
        name="IdentityId"
        type="hidden"
        value={user.id}
        register={register}
        errors={errors}
    />
        
        <div style={{border : 'none'}} className='d-flex align-itens-center justify-content-center'>
            <button  type='submit' className={`btn btn-primary ${styles.boton}`}>Actualizar valores</button>
        </div>
        

        </form>
        </section>
        </main> : width > 767 ?  <main className={`${styles.mainOrdenador}`}>
        
            <section className={`${styles.perfilOrdenador}} flex-column d-flex align-items-center justify-content-center container pt-4`} style={{gap : '20px'}}>
                <ModalReact tituloBoton={'Editar Perfil.'} tipoBoton='btn btn-secondary' body={() => {
                        
                    return<>
                    <div className={styles.imagenPerfil}>
                        <p className='fw-bold'>Foto de perfil.</p>
                        <img src={imagenPerfil ? imagenPerfil : imagenPerfilExtra}/>
                    </div>
                    
                    <form onSubmit={onEdit}>
                        <CampoInput
                            name='file'
                            type='file'
                            register={register}
                            required={false}
                            errors={errors}
                            placeholder='Foto de perfil'
                        />

                        <CampoInput
                            name='PrimerNombre'
                            type='text'
                            label={'Nombre'}
                            register={register}
                            required={true}
                            classFom={'form-control'}
                            errors={errors}
                            placeholder='Primer nombre.'
                        />

                        <CampoInput
                            name='Apellido'
                            label={'Aplellido'}
                            type='text'
                            register={register}
                            required={true}
                            classFom={'form-control'}
                            errors={errors}
                            placeholder='Apellido.'
                        />

                        <CampoInput
                            name='UserName'
                            label={'Nombre de Usuario'}
                            type='text'
                            register={register}
                            required={true}
                            classFom={'form-control'}
                            errors={errors}
                            placeholder='Nombre de usuario.'
                        />

                        <button className='btn btn-primary float-end w-25'>Editar</button>
                    </form>
                </>
                }}/>
                <h1>Calcular calorias diarias.</h1>
            </section>

        <section className={`container ${styles.formularioOrdenador} pt-4 d-flex flex-column align-items-center justify-content-center`}>
            <form onSubmit={onSubmit}>

            <CampoInput
            name='Edad'
            label={'Edad'}
            placeholder={'Edad'}
            type='number'
            required={true}
            errors={errors}
            register={register}
        />

        <CampoInput
            name="Genero"
            label={'Genero'}
            placeholder={'Genero'}
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su género' },
                { value: 'masculino', label: 'Hombre' },
                { value: 'femenino', label: 'Mujer' }
            ]}
        />

        <CampoInput
            name='Altura'
            label={'Altura (Pies)'}
            placeholder='Altura'
            type='number'
            decimal={true}
            required={true}
            errors={errors}
            register={register}
        />

        <CampoInput
            name='Peso'
            label={'Peso (Libras)'}
            placeholder='Peso'
            type='number'
            required={true}
            errors={errors}
            register={register}
        />


        <CampoInput
            name="NivelActividadFisica"
            label={'Nivel de actividad fisica'}
            placeholder="Actividad Física"
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su nivel' },
                { value: '1.2', label: 'Sedentario' },
                { value: '1.375', label: 'Ligero (1-3 dias)' },
                { value: '1.55', label: 'Moderado (3-5 dias)' },
                { value: '1.725', label: 'Intenso (6-7 dias)' },
                { value: '1.9', label: 'Muy Intenso' }
            ]}
        />

        <CampoInput
            name="Objetivo"
            label={'Objetivo'}
            placeholder="Objetivo"
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su objetivo ' },
                { value: '-500', label: 'Perder Peso' },
                { value: '0', label: 'Mantener Peso' },
                { value: '+500', label: 'Ganar Peso' }
            ]}
        />

    <CampoInput
        name="IdentityId"
        type="hidden"
        value={user.id}
        register={register}
        errors={errors}
    />

<section style={{ gridColumn: '1 / 3', textAlign: 'center' }} className={`mt-1`}>
    <button type='submit' className={`w-75 mt-1 p-2 btn btn-primary ${styles.botonOrdenador}`}>Actualizar valores</button>
</section>

        </form>
        </section>
        </main> : ''}
    </>
}