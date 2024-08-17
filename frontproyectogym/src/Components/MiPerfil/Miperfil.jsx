import CampoInput from '../CampoInput/CampoInput'
import { useForm } from 'react-hook-form'
import styles from '../MiPerfil/MiPerfil.module.css'
import Contenedor from '../Contenedor/Contenedor'
import HeaderPaginaPrincipal from '../HeaderPaginaPrincipal/HeaderPaginaPrincipal'
import { AuthContext } from '../../Auth/AuthContext'
import { useContext, useEffect, useState } from 'react'
import swal from 'sweetalert'
import calcularCalorias from '../../Metodos/CalcularCalorias'
import { useNavigate, useParams } from 'react-router-dom'
import EditarDataAutorizacion from '../../Datos/EditarDataAutorizacion'
import getDatosUser from '../../Datos/ObtenerCalculoCalorias'

export default function MiPerfil(){
    const {register, formState : {errors}, handleSubmit,reset} = useForm()
    const {fecha} = useParams();
    const {user} = useContext(AuthContext)
    const [data, setData] = useState();
    const navigate = useNavigate();

    const obtenerDatosUser = async () =>{
        const url = `https://localhost:7051/api/v1/Usuario/ObtenerUsuarios?id=${user.id}`;
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
            else if(data.objetivo === 'Mantener el Peso'){
                data.objetivo = '0'
            }
            else if(data.objetivo === 'Ganar Peso'){
                data.objetivo = '+500'
            }
            reset({
                Peso: data.peso,
                Altura: data.altura,
                Edad: data.edad,
                Genero: data.genero,
                NivelActividadFisica: data.nivelActividadFisica,
                Objetivo: data.objetivo
            });
        }
    }, [data]);

    const onSubmit = handleSubmit( async (data) => {
        const url = `https://localhost:7051/api/v1/Usuario/EditarValoresUsuario?id=${user.id}`
        const calorias = calcularCalorias(
            parseFloat(data.Peso),
            parseFloat(data.Altura),
            parseInt(data.Edad),
            parseFloat(data.NivelActividadFisica),
            data.Objetivo,
            data.Genero
        );
        data.Calorias = calorias;
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
    let imagenPerfil = user.imgUrl === '' ? imagen : `https://localhost:7051${user.imgUrl}`;

    return<>
        <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
                <HeaderPaginaPrincipal fecha={fecha} home= {true}/>
        </Contenedor>

        <section className = {styles.perfil}>
            <img className={styles.imagen} src={imagenPerfil}/>
            <p className='fw-bold mt-3'>{user.userName}</p>
        </section>
        
        <main className={styles.main}>
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
            label={'Altura (CM)'}
            placeholder='Altura'
            type='text'
            required={true}
            errors={errors}
            register={register}
        />

        <CampoInput
            name='Peso'
            label={'Peso (LBS)'}
            placeholder='Peso'
            type='text'
            required={true}
            errors={errors}
            register={register}
        />


        <CampoInput
            name="NivelActividadFisica"
            placeholder="Actividad Física"
            label={'Nivel de actividad fisica'}
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su nivel' },
                { value: '1.2', label: 'Sedentario' },
                { value: '1.375', label: 'Ligero' },
                { value: '1.55', label: 'Moderado' },
                { value: '1.725', label: 'Intenso' },
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
                { value: '0', label: 'Mantener el Peso' },
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
        </main>
    </>
}