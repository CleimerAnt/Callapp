import { useForm } from "react-hook-form";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import EliminarDatos from '../../Datos/EliminarDatos'
import CampoInput from "../CampoInput/CampoInput";
import { useNavigate, useParams } from "react-router-dom";

export default function FormularioEliminarAlimentoDelUsuario() {
    const { formState: { errors }, handleSubmit, register } = useForm();
    const {fecha} = useParams();
    const { user } = useContext(AuthContext);
    const {alimentoId} = useParams();
    const navigate = useNavigate()

    const onSubmit = handleSubmit (async (data) => {
        const url = `https://localhost:7051/api/v1/Alimentos?id=${data.alimentoId}`

        console.log(url)

        try {
            const response = await EliminarDatos(url, user);
            if (response.ok) {
                swal('Eliminado', 'Alimento eliminado exitosamente', "success").then(() => {
                    navigate(`/accionesAlimentos/${fecha}`);
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
            <div className="card container mt-5" style={{ maxWidth: "600px" }}>
    <div className="card-header bg-primary">
        <h4 className="text-center mt-1 text-white">Eliminar alimento del contenedor</h4>
    </div>
    <div className="card-body">
        <p className="card-text text-center" style={{ fontSize: "20px" }}>
            ¿Está seguro que desea eliminar el alimento?
        </p>
        <form onSubmit={onSubmit}>
            <CampoInput
                name={'alimentoId'}
                type={'hidden'}
                register={register}
                value={parseInt(alimentoId)}
                required={true}
                errors={errors}
            />
            <div className="d-flex justify-content-around flex-row-reverse mt-3">
                <button type="submit" className="btn btn-danger w-45">Aceptar</button>
                <button onClick={() => navigate(`/accionesAlimentos/${fecha}`)} className="btn btn-secondary w-45">Cancelar</button>
            </div>
        </form>
    </div>
</div>


            
        </>
    );
}


