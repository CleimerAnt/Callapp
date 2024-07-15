import {useForm} from 'react-hook-form';
import CampoInput from '../CampoInput/CampoInput';
import postDataAutorizacion from '../../Datos/PostDataAutorizacion';
import { AuthContext } from '../../Auth/AuthContext';
import { useContext } from 'react';
import BotonForm from '../BotonForm/BotonForm'

export default function FormularioAgregarAlimentos({id,comida, userId}){
    const {handleSubmit, register, formState : {errors}} = useForm()
    const urlPostContenedor = `https://localhost:7051/api/v1/ContenedorAlimentos`;
    const {user} = useContext(AuthContext)

    const onSubmit = handleSubmit(async(data) =>  {
        const alimentosIdObjeto = [data.alimentosId] 
        data.alimentosId = alimentosIdObjeto;
        console.log(data)
        try{
            const response = await postDataAutorizacion(urlPostContenedor, data, user)
            console.log(await response)
        }
        catch(err){
            console.error(err)
        }
        })

        return <>
        <form onSubmit={onSubmit}>
        <CampoInput 
        name='horario'
        type={'hidden'}
        register={register}
        value={comida}
        required={true}
        errors={errors}
        />
        
        <CampoInput 
        name={'usuarioIdString'}
        type={'hidden'} 
        register={register}
        required={true}
        value={userId}
        errors={errors}
        />

        <CampoInput 
        name={'alimentosId'}
        type={'hidden'}
        register={register}
        required={true}
        value={id}
        errors={errors}
        />

        <BotonForm texto={'Agregar'}  tipoBoton={'btn btn-primary'}/>
        </form>
        </>
    }
