import { Container } from "react-bootstrap";
import CampoInput from "../CampoInput/CampoInput";
import { useForm } from 'react-hook-form';
import BotonForm from "../BotonForm/BotonForm";
import { useContext } from "react";
import {AuthContext} from '../../Auth/AuthContext'
import postDataAutorizacion from "../../Datos/PostDataAutorizacion";
import calcularCalorias from "../../Metodos/CalcularCalorias";


export default function FormularioCalorias() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const {user} = useContext(AuthContext)

    const onSubmit = handleSubmit(async(data) => {
        const url = 'https://localhost:7051/api/v1/Usuario/AgregarUsuarios'
        
        const calorias = calcularCalorias(
            parseFloat(data.Peso),
            parseFloat(data.Altura),
            parseInt(data.Edad),
            parseFloat(data.NivelActividadFisica),
            data.Objetivo,
            data.Genero
        );
        data.Calorias = calorias
        await postDataAutorizacion(url, data, user)
    });

    return (
        <Container>
            <form onSubmit={onSubmit}>
                <CampoInput
                    name='Edad'
                    label='Edad'
                    type='number'
                    required={true}
                    errors={errors}
                    register={register}
                />

                <CampoInput
                    name="Genero"
                    label="Género"
                    type="select"
                    required={true}
                    errors={errors}
                    register={register}
                    options={[
                        { value: '', label: 'Seleccione su género' },
                        { value: 'masculino', label: 'Hombre' },
                        { value: 'femenino', label: 'Mujer' }
                    ]}
                />

                <CampoInput
                    name='Altura'
                    label='Altura'
                    type='text'
                    required={true}
                    errors={errors}
                    register={register}
                />

                <CampoInput
                    name='Peso'
                    label='Peso'
                    type='text'
                    required={true}
                    errors={errors}
                    register={register}
                />

                <CampoInput
                    name="NivelActividadFisica"
                    label="Nivel de Actividad Física"
                    type="select"
                    required={true}
                    errors={errors}
                    register={register}
                    options={[
                        { value: '', label: 'Seleccione su nivel' },
                        { value: '1.2', label: 'Sedentario' },
                        { value: '1.375', label: 'Ligero' },
                        { value: '1.55', label: 'Moderado' },
                        { value: '1.725', label: 'Intenso' },
                        { value: '1.9', label: 'Muy Intenso' }
                    ]}
                />

                <CampoInput
                    name="Objetivo"
                    label="Objetivo"
                    type="select"
                    required={true}
                    errors={errors}
                    register={register}
                    options={[
                        { value: '', label: 'Seleccione su objetivo ' },
                        { value: '-500', label: 'Perder Peso' },
                        { value: '0', label: 'Mantener el Peso' },
                        { value: '+500', label: 'Ganar Peso' }
                    ]}
                />

                <CampoInput
                    name="IdentityId"
                    type="hidden"
                    value={user.id}
                    register={register}
                    errors={errors}
                />

                <BotonForm texto='Enviar' />
            </form>
        </Container>
    );
}

