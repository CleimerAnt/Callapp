import { useForm } from "react-hook-form"
import { AuthContext } from "../../Auth/AuthContext"
import { useContext } from "react"
import CampoInput from "../CampoInput/CampoInput"
import postDataAutorizacion from "../../Datos/PostDataAutorizacion"

export default function FormularioAlimentos(){
    const {register, formState: {errors}, handleSubmit} = useForm()
    const {user} = useContext(AuthContext)
    const url = `https://localhost:7051/api/v1/Alimentos/Agregar alimentos`;
    
    const onSubmit = handleSubmit( async (data) => {
        data.usuarioIdString = user.id
        console.log(data)
        const response = await postDataAutorizacion(url,data,user)
        console.log(response)
    })
    return<>
    <button type="button" className="btn btn-primary mt-3" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Agregar Alimento
    </button>
<form onSubmit={onSubmit}>
<div className="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
<div className="modal-dialog">
    <div className="modal-content">
        <div className="modal-header">
            <h1 className="modal-title fs-5" id="exampleModalLabel">Agregar alimentos</h1>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
        
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
        
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
            <button type="submit" className="btn btn-primary">Agregar</button>
        </div>
    </div>
    </div>
</div></form>
    </>
}