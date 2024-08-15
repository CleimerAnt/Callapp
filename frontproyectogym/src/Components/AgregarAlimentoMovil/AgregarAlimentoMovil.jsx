import { useParams } from "react-router-dom"
import ObtenerElementoPorId from '../../Datos/ObtenerElementoPorId'
import CampoInput from "../CampoInput/CampoInput"
import styles from '../AgregarAlimentoMovil/AgregarAlimentoMovil.module.css'
import {useForm} from 'react-hook-form';
import { useNavigate } from "react-router-dom"
import postDataAutorizacion from "../../Datos/PostDataAutorizacion"
import Grafica from "../Grafica/Grafica"
import swal from "sweetalert"
import { AuthContext } from "../../Auth/AuthContext"
import { useContext, useEffect, useState } from "react";

export default function AgregarAlimentoMovil(){
    const {register, handleSubmit, formState : {errors}} = useForm()
    const [alimento, setAlimento] = useState()
    const navigate = useNavigate();
    const {user} = useContext(AuthContext)
    console.log(user)
    const {id, comida, fecha} = useParams()
    const urlPostContenedor = `https://localhost:7051/api/v1/ContenedorAlimentos`;
    const url = `https://localhost:7051/api/v1/Alimentos/Obtener Alimentos por el Id?id=${id}`

    const onSubmit = handleSubmit( async (data) => {
        const alimentosIdObjeto = [data.alimentosId];
        data.alimentosId = alimentosIdObjeto;
        data.Fecha = fecha;
        console.log('fecha',data.Fecha)
        try {
            const response = await postDataAutorizacion(urlPostContenedor, data, user);
            console.log(response)
            if (response.status === 201) {
                swal('Agregado', 'Alimento agregado exitosamente', 'success')
        .then(() => {
            navigate(`/PaginaPrincipal/${fecha}`);
        });
            } else {
                swal('Error', 'Error al agregar el alimento', "warning");
            }
        } catch (err) {
            console.error(err);
        }
    })

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await ObtenerElementoPorId(url, user.jwToken);
                setAlimento(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [url, user.jwToken]);
    console.log(alimento)
    return<>
    {alimento ? <Grafica proteina={alimento.proteina} carbohidratos={alimento.carbohidratos} grasa={alimento.grasa}/> : ''}
        <form onSubmit={handleSubmit(onSubmit)} className={`${styles.formulario}`}>
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
                        value={user.id}
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
}