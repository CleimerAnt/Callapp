import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import EliminarDatos from '../../Datos/EliminarDatos'
import Modal from "../Modal/Modal";
import CampoInput from "../CampoInput/CampoInput";
import { useNavigate, useParams } from "react-router-dom";

export default function FormularioEliminarAlimento() {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const { user } = useContext(AuthContext);
    const {alimentoId, contenedorId} = useParams();
    const navigate = useNavigate()

    const onSubmit = handleSubmit (async (data) => {
        const url = `https://localhost:7051/api/v1/ContenedorAlimentos/Eliminar alimento del contenedor?alimentoId=${parseInt(data.alimentoId)}&contenedorId=${parseInt(data.contenedorId)}`;

        console.log(url)

        try {
            const response = await EliminarDatos(url, user);
            if (response.ok) {
                swal('Eliminado', 'Alimento eliminado exitosamente', "success").then(() => {
                    navigate('/PaginaPrincipal'); 
                });
            }
            else{
                swal('Error', 'Error al eliminar el alimento', "warning");
            }
        } catch (err) {
            console.error(err);
        }
    });

    return (
        <>
            <h3>¿Desea eliminar este alimento?</h3>
            <form onSubmit={onSubmit}>
                    <CampoInput
                        name={'alimentoId'}
                        type={'hidden'}
                        register={register}
                        value={parseInt(alimentoId)}
                        required={true}
                        errors={errors}
                    />

                    <CampoInput
                        name={'contenedorId'}
                        type={'hidden'}
                        register={register}
                        value={parseInt(contenedorId)}
                        required={true}
                        errors={errors}
                    />
                
                    <button type="submit" className={`btn btn-danger float-end mt-3`}>Aceptar</button>
                </form>
        </>
    );
}
