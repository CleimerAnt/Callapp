import { useForm } from "react-hook-form"
import { AuthContext } from "../../Auth/AuthContext"
import { useContext } from "react"
import CampoInput from "../CampoInput/CampoInput"
import postDataAutorizacion from "../../Datos/PostDataAutorizacion"
import Modal from "../Modal/Modal"

export default function FormularioAlimentos(){
    const {register, formState: {errors}, handleSubmit} = useForm()
    const {user} = useContext(AuthContext)
    const url = `https://localhost:7051/api/v1/Alimentos/Agregar alimentos`;

    const onSubmit = async (data) => { 
        data.usuarioIdString = user.id
        const response = await postDataAutorizacion(url,data,user)

        if(response.ok){
            swal('Agregado', 'Alimento agregado exitosamente', "success");
        }
        else if(response.status === 400){
            swal('Error', 'El alimento se encuentra agregado', "warning");
        }
    }


    return (
        <>
        <Modal tipoBoton={'primary'} texto={'Agregar'} titulo={'Agregar Alimento'} id={user.id} body={() => (
            <form onSubmit={handleSubmit(onSubmit)}>
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
                name='usuarioId'
                type='hidden'
                classFom={'form-control'}
                value={user.id}
                register={register}
                errors={errors}
            />

            <button type="submit" className="btn btn-primary">Agregar</button>
            </form>
        )}
        /> 
        </>)
}