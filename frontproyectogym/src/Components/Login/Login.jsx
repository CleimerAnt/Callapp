import Contenedor from '../Contenedor/Contenedor'
import CampoInput from '../CampoInput/CampoInput'
import {useForm} from 'react-hook-form'
import PostUsuario from '../../Datos/PostUsuario'
import {Link} from 'react-router-dom'

export default function Login()
{
    const {register, formState: {errors}, handleSubmit} = useForm()

    const onsubmit = handleSubmit((data) =>{
        console.log(data)
        const url = 'https://localhost:7051/api/v1/Account/authenticate'

        PostUsuario(url,data)
    })

    return<Contenedor >
    <form onSubmit={onsubmit}>
        <CampoInput 
        name='email'
        type='email'
        label='Correo Electronico'
        register={register}
        required={true}
        errors={errors}
        />

        <CampoInput 
        name='password'
        type='password'
        label='Contraseña'
        register={register}
        required={true}
        errors={errors}
        />

        <div className="mb-3 float-end">
            <button type="submit" className='btn btn-primary'>Loguearme</button>
        </div>

        <Link to={'/Registro'}>Registro</Link>
    </form>    
</Contenedor>
}

