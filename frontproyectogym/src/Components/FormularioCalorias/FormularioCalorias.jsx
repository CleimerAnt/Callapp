import calcularMacronutrientes from "../../Metodos/CalcularMacronutrientes";
import CampoInput from "../CampoInput/CampoInput";
import { useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from '../../Auth/AuthContext';
import postDataAutorizacion from "../../Datos/PostDataAutorizacion";
import styles from '../FormularioCalorias/FormularioCalorias.module.css'; 
import calcularCalorias from "../../Metodos/CalcularCalorias";

export default function FormularioCalorias() {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { user, width } = useContext(AuthContext);
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

        const macronutrientes = calcularMacronutrientes(
            parseFloat(data.Peso),
            parseFloat(data.Altura),
            parseInt(data.Edad),
            parseFloat(data.NivelActividadFisica),
            data.Objetivo,
            data.Genero
        )

        console.log('Macronutrientes: ', macronutrientes.proteinas)

        data.Calorias = calorias;
        data.Proteinas = macronutrientes.proteinas;
        data.Carbohidratos = macronutrientes.carbohidratos;
        data.Grasas = macronutrientes.grasas;
        data.IdentityId = user.id;


        console.log('Datos enviados:', data);

        try {
            const response = await postDataAutorizacion(url, data, user);
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
        <>
        
        <header className={`${styles.perfilOrdenador}} d-flex align-items-center justify-content-center container pt-4`} style={{gap : '20px'}}>
                <h1>Calcular calorias diarias.</h1>
            </header>

        {width >= 1024 ?  <main className={`${styles.mainOrdenador}`}>
        
        <section className={`container ${styles.formularioOrdenador} mt-4 d-flex flex-column align-items-center justify-content-center`}>
            <form onSubmit={onSubmit}>

            <CampoInput
            name='Edad'
            label={'Edad'}
            placeholder={'Edad'}
            type='number'
            required={true}
            errors={errors}
            register={register}
        />

        <CampoInput
            name="Genero"
            label={'Genero'}
            placeholder={'Genero'}
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
            label={'Altura (Pies)'}
            placeholder='Altura'
            type='text'
            required={true}
            errors={errors}
            register={register}
        />

        <CampoInput
            name='Peso'
            label={'Peso (Libras)'}
            placeholder='Peso'
            type='text'
            required={true}
            errors={errors}
            register={register}
        />


        <CampoInput
            name="NivelActividadFisica"
            label={'Nivel de actividad fisica'}
            placeholder="Actividad Física"
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su nivel' },
                { value: '1.2', label: 'Sedentario' },
                { value: '1.375', label: 'Ligero (1-3 dias)' },
                { value: '1.55', label: 'Moderado (3-5 dias)' },
                { value: '1.725', label: 'Intenso (6-7 dias)' },
                { value: '1.9', label: 'Muy Intenso' }
            ]}
        />

        <CampoInput
            name="Objetivo"
            label={'Objetivo'}
            placeholder="Objetivo"
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su objetivo ' },
                { value: '-500', label: 'Perder Peso' },
                { value: '0', label: 'Mantener Peso' },
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

<section style={{ gridColumn: '1 / 3', textAlign: 'center' }} className={`mt-4`}>
    <button type='submit' className={`w-75 mt-1 p-2 btn btn-primary ${styles.botonOrdenador}`}>Ingresar valores</button>
</section>

        </form>
        </section>
        </main> : width <= 767 ?  <main className={`${styles.contenedor} mt-5`}>
        <section className={styles.main}>
        <form onSubmit={onSubmit}>
        <CampoInput
            name='Edad'
            label={'Edad'}
            placeholder={'Edad'}
            type='number'
            required={true}
            errors={errors}
            register={register}
        />

        <CampoInput
            name="Genero"
            label={'Genero'}
            placeholder={'Genero'}
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
            label={'Altura (CM)'}
            placeholder='Altura'
            type='text'
            required={true}
            errors={errors}
            register={register}
        />

        <CampoInput
            name='Peso'
            label={'Peso (LBS)'}
            placeholder='Peso'
            type='text'
            required={true}
            errors={errors}
            register={register}
        />


            <CampoInput
            name="NivelActividadFisica"
            label={'Nivel de actividad fisica'}
            placeholder="Actividad Física"
            type="select"
            required={true}
            errors={errors}
            register={register}
            options={[
                { value: '', label: 'Seleccione su nivel' },
                { value: '1.2', label: 'Sedentario' },
                { value: '1.375', label: 'Ligero (1-3 dias)' },
                { value: '1.55', label: 'Moderado (3-5 dias)' },
                { value: '1.725', label: 'Intenso (6-7 dias)' },
                { value: '1.9', label: 'Muy Intenso' }
            ]}
            />

        <CampoInput
            name="Objetivo"
            label={'Objetivo'}
            placeholder="Objetivo"
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
        
        <div style={{border : 'none'}} className='d-flex align-itens-center justify-content-center'>
            <button  type='submit' className={`btn btn-primary ${styles.boton}`}>Ingresar valores</button>
        </div>
        

        </form>
        </section>
        </main> : ''}
        
        </>
    );
}
