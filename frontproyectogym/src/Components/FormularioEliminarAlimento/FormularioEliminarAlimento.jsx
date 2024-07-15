import { useForm } from "react-hook-form"
import CampoInput from "../CampoInput/CampoInput";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import EliminarDatos from "../../Datos/EliminarDatos";

export default function FormularioEliminarAlimento({alimentoId, contenedorId}){
    const {formState : {errors}, handleSubmit, register} = useForm();
    const {user} = useContext(AuthContext);

    const onSubmit = handleSubmit( async (data) => {
        const url = `https://localhost:7051/api/v1/ContenedorAlimentos/Eliminar alimento del contenedor?alimentoId=${data.alimentoId}&contenedorId=${data.contenedorId}`;
        
        await EliminarDatos(url, user)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.log(err))
    })

    return<>
    <form onSubmit={onSubmit}>
        <CampoInput
        name={'alimentoId'}
        type={'hidden'}
        register={register}
        value={alimentoId}
        required={true}
        errors={errors}
        />

        <CampoInput
        name={'contenedorId'}
        type={'hidden'}
        register={register}
        value={contenedorId}
        required={true}
        errors={errors}
        />

        <button className="btn btn-danger">Eliminar</button>
    </form>
    </>
}