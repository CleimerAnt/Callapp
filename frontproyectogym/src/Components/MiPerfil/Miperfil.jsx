import CampoInput from '../CampoInput/CampoInput'
import { useForm } from 'react-hook-form'
import { AuthContext } from '../../Auth/AuthContext'
import { useContext } from 'react'
import swal from 'sweetalert'
import calcularCalorias from '../../Metodos/CalcularCalorias'
import { useNavigate } from 'react-router-dom'
import EditarDataAutorizacion from '../../Datos/EditarDataAutorizacion'

export default function MiPerfil(){
    const {register, formState : {errors}, handleSubmit} = useForm()
    const {user} = useContext(AuthContext)
    const navigate = useNavigate();

    const onSubmit = handleSubmit( async (data) => {
        const url = `https://localhost:7051/api/v1/Usuario/EditarValoresUsuario?id=${user.id}`
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

        try{
            const response = await EditarDataAutorizacion(url, data, user);
            console.log('Respuesta del servidor', response);

            if(response.status === 200){
                swal({
                    title: "Aviso",
                    text: "Datos actualizados",
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
            }
            else{
                swal('Aviso', 'Error al actualizar los datos', 'Warning')
            }
        }
        catch(err){
            return err;
        }
    })

    return<>
        <form onSubmit={onSubmit}>
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


        <CampoInput
            name="NivelActividadFisica"
            placeholder="Actividad Física"
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

    <CampoInput
        name="IdentityId"
        type="hidden"
        value={user.id}
        register={register}
        errors={errors}
    />

            <button type='submit' className='btn btn-primary'>Actualizar valores</button>
        </form>
    </>
}