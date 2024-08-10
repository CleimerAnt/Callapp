import { useForm } from "react-hook-form"
import { AuthContext } from "../../Auth/AuthContext"
import { useContext } from "react"
import CampoInput from "../CampoInput/CampoInput"
import postDataAutorizacion from "../../Datos/PostDataAutorizacion"
import Modal from "../Modal/Modal";
import { useNavigate } from "react-router-dom"

export default function FormularioAlimentos({fecha}){
    const {register, formState: {errors}, handleSubmit} = useForm()
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const url = `https://localhost:7051/api/v1/Alimentos/Agregar alimentos`;

    const onSubmit = async (data) => { 
        data.usuarioIdString = user.id;
        try {
            const response = await postDataAutorizacion(url, data, user);
        
            if (response.ok) {
                swal({
                    title: 'Agregado',
                    text: 'Alimento agregado exitosamente',
                    icon: 'success',
                    button: 'OK',
                }).then(() => {
                    navigate(`/accionesAlimentos/${fecha}`); 
                });
            } else if (response.status === 400) {
                swal('Error', 'El alimento ya se encuentra agregado', 'warning');
            } else {
                swal('Error', 'Hubo un problema al agregar el alimento', 'error');
            }
        } catch (error) {
            console.error('Error:', error);
            swal('Error', 'Ocurrió un error inesperado. Por favor, inténtelo de nuevo más tarde.', 'error');
        }
    }


    return (
        <>
        <Modal tipoBoton={'primary'} texto={'Agregar'} titulo={'Agregar Alimento'} id={user.id} body={() => (
            <form onSubmit={handleSubmit(onSubmit)}>
                <CampoInput
                name='nombreAlimento'
                label={'Nombre'}
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
                label={'Porcion'}
                classFom={'form-control'}
                placeholder={'Porcion'}
                required={true}
                register={register}
                errors={errors}
            />

            <CampoInput
                name='calorias'
                type='text'
                label={'Calorias'}
                classFom={'form-control'}
                placeholder={'Calorias'}
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
                label={'Proteina'}
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
                label={'Descripcion'}
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

            <button type="submit" className="btn btn-primary float-end w-25">Agregar</button>
            </form>
        )}
        /> 
        </>)
}