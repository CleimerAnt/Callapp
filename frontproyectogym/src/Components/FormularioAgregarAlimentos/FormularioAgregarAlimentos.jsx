import CampoInput from '../CampoInput/CampoInput';
import postDataAutorizacion from "../../Datos/PostDataAutorizacion";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";
import { useForm } from "react-hook-form";
import ModalReact from '../ModalReact/ModalReact';
import { useNavigate } from 'react-router-dom';

export default function FormularioAgregarAlimentos({ id, comida, userId, macros = [], fecha }) {
    const urlPostContenedor = `https://localhost:7051/api/v1/ContenedorAlimentos`;
    const { user } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate()

    const enviarFormulario = async (data) => {
        
        console.log(data)
        const alimentosIdObjeto = [data.alimentosId];
        data.alimentosId = alimentosIdObjeto;
        data.Fecha = fecha;
        try {
            const response = await postDataAutorizacion(urlPostContenedor, data, user);
            console.log(response)
            if (response.status === 201) {
                swal('Agregado', 'Alimento agregado exitosamente', "success")
                    .then(() => {
                        navigate(`/PaginaPrincipal/${fecha}`);
                    });
            } else {
                swal('Error', 'Error al agregar el alimento', "warning");
            }
        } catch (err) {
            console.error(err);
        }
    };

    return (

            <ModalReact isGrafica={true} proteina={macros[0]} carbohidratos={macros[1]} grasas={macros[2]} tituloBoton={'Agregar'} body={() => {

                return<>  
                <form onSubmit={handleSubmit(enviarFormulario)}>

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
                <button type="submit" className="btn btn-primary float-end w-25">Aceptar</button>
            </form>
            </>
            }}/>
        
        
    );
}

{/*

    */}