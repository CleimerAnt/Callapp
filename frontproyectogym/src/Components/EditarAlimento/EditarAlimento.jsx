import { useContext, useEffect, useState } from 'react'
import {useForm} from 'react-hook-form'
import { AuthContext } from "../../Auth/AuthContext";
import CampoInput from '../CampoInput/CampoInput';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Contenedor from '../Contenedor/Contenedor';
import swal from 'sweetalert';
import EditarDataAutorizacion from '../../Datos/EditarDataAutorizacion';
import getDatosUser from '../../Datos/ObtenerCalculoCalorias';

export default function EditarAlimento(){
    const {user} = useContext(AuthContext)
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
    

    console.log(alimento)

    const onSubmit = handleSubmit(async (data) => {
        console.log(data)
        const url = `https://localhost:7051/api/v1/Alimentos/Editar Alimentos?id=${alimentoId}`;

        try{
            const response = await EditarDataAutorizacion(url, data, user);

            if (response.status === 200) {
                swal('Editado', 'Alimento editado exitosamente', "success").then(() => {
                    navigate(`/PaginaPrincipal/${new Date().toISOString()}`); 
                });
            } else {
                swal('Error', 'Error al editar el alimento', "warning");
            }
        }
        catch(err){
            throw err
        }
    })
    return <>
        <Contenedor elemento='main'>
        <form onSubmit={onSubmit}>
            <CampoInput
            name='nombreAlimento'
            type='text'
            placeholder={'Nombre del Alimento'}
            classFom={'form-control'}
            required={true}
            register={register}
            errors={errors}
        />

        <CampoInput
            name='porcion'
            type='text'
            classFom={'form-control'}
            placeholder={'Porcion'}
            required={true}
            register={register}
            errors={errors}
        />

        <CampoInput
            name='calorias'
            type='text'
            classFom={'form-control'}
            placeholder={'Calorias'}
            required={true}
            register={register}
            errors={errors}
        />

        <CampoInput
            name='grasa'
            type='text'
            placeholder={'Grasa'}
            classFom={'form-control'}
            required={true}
            register={register}
            errors={errors}
        />

        <CampoInput
            name='carbohidratos'
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
            placeholder={'Proteina'}
            classFom={'form-control'}
            required={true}
            register={register}
            errors={errors}
        />

        <CampoInput
            name='descripcion'
            type='textarea'
            classFom={'form-control'}
            placeholder={'Descripcion'}
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

        <button type='submit'>Enviar</button>
        </form>
        </Contenedor>
    </>
}