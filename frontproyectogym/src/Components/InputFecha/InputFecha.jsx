import { Form, useForm } from "react-hook-form";
import CampoInput from "../CampoInput/CampoInput";
import { useNavigate } from "react-router-dom";
import ContenedorFechas from "../ContenedorFechas/ContenedorFechas";

export default function InputFecha({fechas = []}){
    const {register, reset, handleSubmit, formState : {errors}} = useForm();
    const navigate = useNavigate()

    const onSubmit = handleSubmit((data) => {
        navigate(`/PaginaPrincipal/${data.Fecha}`)
    })

    const obejeto = fechas.map((element) => {
        return {
                value:element, label:element
            }
        
    })

    return<>
    <ContenedorFechas />
    <form onSubmit={onSubmit}>
        <CampoInput
        name="Fecha"
        placeholder="Fecha"
        classFom={'form-control'}
        type="select"
        required={true}
        errors={errors}
        register={register}
        options={[...obejeto]}
        />
        <button type="submit">Enviar</button>
    </form>
    </>
}