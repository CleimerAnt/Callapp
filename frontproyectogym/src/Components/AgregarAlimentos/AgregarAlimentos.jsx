import CampoInput from "../CampoInput/CampoInput"
import { useForm } from "react-hook-form"
import HeaderPaginaPrincipal from "../HeaderPaginaPrincipal/HeaderPaginaPrincipal"
import postDataAutorizacion from "../../Datos/PostDataAutorizacion"
import Contenedor from "../Contenedor/Contenedor"
import { AuthContext } from "../../Auth/AuthContext"
import styles from '../AgregarAlimentos/AgregarAlimentos.module.css'
import { useContext } from "react"
import { useNavigate, useParams } from "react-router-dom"

export default function AgregarAlimentos(){
    const {fecha} = useParams()
    const {handleSubmit, register, formState : {errors}} = useForm()
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();
    const url = import.meta.env.VITE_API_BASE_AGREGARALIMENTOS;
    const onSubmit = handleSubmit( async (data) => {
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
            return error;
        }
    })

    return<>
    <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
                <HeaderPaginaPrincipal principal={true} fecha={fecha} home= {true}/>
    </Contenedor>

    <main className={styles.main}>
        <form onSubmit={onSubmit} className={styles.formulario}>
            <CampoInput
                name='nombreAlimento'
                type='text'
                label={'Nombre'}
                placeholder={'Nombre del alimento'}
                classFom={'form-control'}
                required={true}
                register={register}
                errors={errors}
            />
            <CampoInput
                name='porcion'
                label={'Porción(100G)'}
                type='number'
                soloLectura={true}
                value={100}
                classFom={'form-control'}
                placeholder={'Porción'}
                required={true}
                register={register}
                errors={errors}
            />
            <CampoInput
                name='calorias'
                label={'Calorías'}
                type='number'
                classFom={'form-control'}
                placeholder={'Calorías'}
                required={true}
                register={register}
                errors={errors}
            />
            <CampoInput
                name='grasa'
                label={'Grasa'}
                type='number'
                decimal={true}
                placeholder={'Grasa'}
                classFom={'form-control'}
                required={true}
                register={register}
                errors={errors}
            />
            <CampoInput
                name='carbohidratos'
                label={'Carbohidratos'}
                type='number'
                decimal={true}
                placeholder={'Carbohidratos'}
                classFom={'form-control'}
                required={true}
                register={register}
                errors={errors}
            />
            <CampoInput
                name='proteina'
                type='number'
                decimal={true}
                label={'Proteína'}
                placeholder={'Proteína'}
                classFom={'form-control'}
                required={true}
                register={register}
                errors={errors}
            />
            <CampoInput
                name='descripcion'
                label={'Descripción'}
                type='textarea'
                classFom={'form-control'}
                placeholder={'Descripción'}
                required={true}
                register={register}
                errors={errors}
            />
            <CampoInput
                name='UsuarioIdString'
                type='hidden'
                classFom={'form-control'}
                value={user.id}
                register={register}
                errors={errors}
            />
            <div className="">
                <button type='submit' className={styles.boton}>Enviar</button>
            </div>
            
        </form>
</main>

    </>
}