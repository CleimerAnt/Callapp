import { useContext, useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import styles from '../EditarAlimento/EditarAlimento.module.css'
import { AuthContext } from "../../Auth/AuthContext";
import HeaderPaginaPrincipal from '../HeaderPaginaPrincipal/HeaderPaginaPrincipal';
import CampoInput from '../CampoInput/CampoInput';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Contenedor from '../Contenedor/Contenedor';
import swal from 'sweetalert';
import EditarDataAutorizacion from '../../Datos/EditarDataAutorizacion';
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';

export default function EditarAlimento(){
    const {user} = useContext(AuthContext)
    const {fecha} = useParams()
    const [alimento, setAlimento] = useState([]);
    const {register, reset, handleSubmit, formState : {errors}} = useForm();
    const {alimentoId} = useParams()
    const navigate = useNavigate();

    const obtenerAlimento = async () => {
        const url = `https://localhost:7051/api/v1/Alimentos/Obtener Alimentos por el Id?id=${alimentoId}`;
        try{
            const response = await getDatosUser(url, user.jwToken)
            setAlimento(response)
        }
        catch(err){
            throw err
        }
    }

    useEffect(() => {
        obtenerAlimento()
    }, [])
    
    useEffect(() => {
        if (alimento) {
            reset({
                nombreAlimento: alimento.nombreAlimento,
                porcion: alimento.porcion,
                calorias: alimento.calorias,
                grasa: alimento.grasa,
                carbohidratos: alimento.carbohidratos,
                proteina: alimento.proteina,
                descripcion: alimento.descripcion
            });
        }
    }, [alimento]);
    

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        const url = `https://localhost:7051/api/v1/Alimentos/Editar Alimentos?id=${alimentoId}`;

        try{
            const response = await EditarDataAutorizacion(url, data, user);

            if (response.status === 200) {
                swal('Editado', 'Alimento editado exitosamente', "success").then(() => {
                    navigate(`/accionesAlimentos/${fecha}`);
                });
            } else {
                console.log(response)
                swal('Error', response, "warning");
            }
        }
        catch(err){
            throw err
        }
    })
    return <>
    <Contenedor elemento='main'>
    <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
            <HeaderPaginaPrincipal fecha={fecha} home= {true}/>
    </Contenedor>


    <form onSubmit={onSubmit} className={styles.formulario}>
        <CampoInput
            name='nombreAlimento'
            type='text'
            label={'Nombre'}
            placeholder={'Nombre del Alimento'}
            classFom={'form-control'}
            required={true}
            register={register}
            errors={errors}
        />
        <CampoInput
            name='porcion'
            label={'Porción'}
            type='text'
            classFom={'form-control'}
            placeholder={'Porción'}
            required={true}
            register={register}
            errors={errors}
        />
        <CampoInput
            name='calorias'
            label={'Calorías'}
            type='text'
            classFom={'form-control'}
            placeholder={'Calorías'}
            required={true}
            register={register}
            errors={errors}
        />
        <CampoInput
            name='grasa'
            label={'Grasa'}
            type='text'
            placeholder={'Grasa'}
            classFom={'form-control'}
            required={true}
            register={register}
            errors={errors}
        />
        <CampoInput
            name='carbohidratos'
            label={'Carbohidratos'}
            type='text'
            placeholder={'Carbohidratos'}
            classFom={'form-control'}
            required={true}
            register={register}
            errors={errors}
        />
        <CampoInput
            name='proteina'
            type='text'
            label={'Proteína'}
            placeholder={'Proteína'}
            classFom={'form-control'}
            required={true}
            register={register}
            errors={errors}
        />
        <CampoInput
            name='descripcion'
            label={'Descripción'}
            type='textarea'
            classFom={'form-control'}
            placeholder={'Descripción'}
            required={true}
            register={register}
            errors={errors}
        />
        <CampoInput
            name='UsuarioIdString'
            type='hidden'
            classFom={'form-control'}
            value={user.id}
            register={register}
            errors={errors}
        />
        <button type='submit' className={styles.boton}>Enviar</button>
    </form>
</Contenedor>

    </>
}