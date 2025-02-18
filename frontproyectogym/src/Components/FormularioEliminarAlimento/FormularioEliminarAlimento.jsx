import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import EliminarDatos from '../../Datos/EliminarDatos'
import CampoInput from "../CampoInput/CampoInput";
import { useNavigate, useParams } from "react-router-dom";

export default function FormularioEliminarAlimento() {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const { user } = useContext(AuthContext);
    const {alimentoId, contenedorId} = useParams();
    const navigate = useNavigate()

    const fechaIso = () => {
        const fechaRD = new Date().toLocaleString('en-US', { timeZone: 'America/Santo_Domingo' });
        return new Date(fechaRD).toISOString();
    };
    

    const onSubmit = handleSubmit (async (data) => {
        const BaseUrl = import.meta.env.VITE_API_BASE_ELIMINARALIMENTO;
        const url = `${BaseUrl}alimentoId=${parseInt(data.alimentoId)}&contenedorId=${parseInt(data.contenedorId)}`;


        try {
            const response = await EliminarDatos(url, user);
            if (response.ok) {
                swal('Eliminado', 'Alimento eliminado exitosamente', "success").then(() => {
                    navigate(`/PaginaPrincipal/${fechaIso()}`); 
                });
            }
            else{
                swal('Error', 'Error al eliminar el alimento', "warning");
            }
        } catch (err) {
            console.error(err);
            return err;
        }
    });

    return (
        <>
            <div class="card container mt-5" style={{ maxWidth: "600px" }}>
                <div class="card-header bg-primary mt-2 ">
                    <h4 className="text-center mt-1 text-white">Eliminar alimento del contenedor</h4>    
                </div>
                <div class="card-body">
                    <p class="card-text text-center" style={{fontSize : "20px"}}>
                    ¿Está seguro de que desea eliminar el alimento? </p>
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
                
                    <div className="d-flex flex-row-reverse" style={{gap: "20px"}}>
                        <button type="submit" className={`btn btn-danger float-end `}>Aceptar</button>
                        <button onClick={() => navigate(`/PaginaPrincipal/${new Date().toISOString()}`)} className={`btn btn-secondary float-end`}>Cancelar</button>
                    </div>
                </form>
                </div>
            </div>

            
        </>
    );
}


