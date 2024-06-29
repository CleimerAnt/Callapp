import { Container } from "react-bootstrap";
import CampoInput from "../CampoInput/CampoInput";
import { useForm } from 'react-hook-form';
import BotonForm from "../BotonForm/BotonForm";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../Auth/AuthContext';
import postDataAutorizacion from "../../Datos/PostDataAutorizacion";
import styles from '../FormularioCalorias/FormularioCalorias.module.css';
import calcularCalorias from "../../Metodos/CalcularCalorias";

export default function FormularioCalorias() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user } = useContext(AuthContext);
    const navigate = useNavigate()


    const onSubmit = handleSubmit(async (data) => {
        const url = 'https://localhost:7051/api/v1/Usuario/AgregarUsuarios';
        
        const calorias = calcularCalorias(
            parseFloat(data.Peso),
            parseFloat(data.Altura),
            parseInt(data.Edad),
            parseFloat(data.NivelActividadFisica),
            data.Objetivo,
            data.Genero
        );
        data.Calorias = calorias;
        data.IdentityId = user.id;

        console.log('Datos enviados:', data);

        try {
            const response = await postDataAutorizacion(url,data, user);
            console.log('Respuesta del servidor:', response);
            swal({
                title: "Aviso",
                text: "Calorías calculadas",
                icon: "success",
                buttons: {
                    confirm: {
                        text: "OK",
                        value: true,
                        visible: true,
                        className: "btn btn-primary",
                        closeModal: true
                    }
                }
            }).then((value) => {
                if (value) {
                    navigate('/PaginaPrincipal');
                }
            });
        } catch (error) {
            console.error('Error al hacer la solicitud:', error);
        }
    });

    return (
        <Container>
            <h1 className="text-center mt-4">Calcular Calorias.</h1>
            <form className={`d-flex flex-column align-items-center justify-content-center ${styles.formulario}`} onSubmit={onSubmit}>
                <div className={styles.contenedor}>
                    <CampoInput
                        name='Edad'
                        placeholder={'Edad'}
                        classFom={'form-control'}
                        type='number'
                        required={true}
                        errors={errors}
                        register={register}
                    />

                    <CampoInput
                        name="Genero"
                        placeholder={'Genero'}
                        classFom={'form-control'}
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
                </div>

                <div className={styles.contenedor}>
                    <CampoInput
                        name='Altura'
                        placeholder='Altura'
                        classFom={'form-control'}
                        type='text'
                        required={true}
                        errors={errors}
                        register={register}
                    />

                    <CampoInput
                        name='Peso'
                        classFom={'form-control'}
                        placeholder='Peso'
                        type='text'
                        required={true}
                        errors={errors}
                        register={register}
                    />
                </div>

                <div className={styles.contenedor}>
                    <CampoInput
                        name="NivelActividadFisica"
                        placeholder="Nivel de Actividad Física"
                        classFom={'form-control'}
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
                        placeholder="Objetivo"
                        classFom={'form-control'}
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
                </div>

                <CampoInput
                    name="IdentityId"
                    type="hidden"
                    value={user.id}
                    register={register}
                    errors={errors}
                />

                <BotonForm texto='Enviar' tipoBoton={'btn btn-primary'} />
            </form>
        </Container>
    );
}
