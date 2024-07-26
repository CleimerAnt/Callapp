import CampoInput from '../CampoInput/CampoInput';
import Modal from '../Modal/Modal';
import postDataAutorizacion from "../../Datos/PostDataAutorizacion";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { useForm } from "react-hook-form";


export default function FormularioAgregarAlimentos({ id, comida, userId, grafica, fecha }) {
    const urlPostContenedor = `https://localhost:7051/api/v1/ContenedorAlimentos`;
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async (data) => {
        const alimentosIdObjeto = [data.alimentosId];
        data.alimentosId = alimentosIdObjeto;
        data.Fecha = fecha;
        console.log('fecha',data.Fecha)
        try {
            const response = await postDataAutorizacion(urlPostContenedor, data, user);
            console.log(response)
            if (response.status === 201) {
                swal('Agregado', 'Alimento agregado exitosamente', "success");
            } else {
                swal('Error', 'Error al agregar el alimento', "warning");
            }
        } catch (err) {
            console.error(err);
        }
    };
    return (
        
            <Modal grafica={grafica} tipoBoton={'primary'} texto={'Agregar'} titulo={'Agregar Alimento'} id={id} body={() => (
                <form onSubmit={handleSubmit(onSubmit)}>
                    
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

                    <CampoInput
                        name={'porcion'}
                        type={'number'}
                        placeholder={'Porción'}
                        register={register}
                        required={true}
                        classFom={'form-control'}
                        errors={errors}
                    />
                    <button type="submit" className="btn btn-primary">Aceptar</button>
                </form>
            )} />
        
    );
}
