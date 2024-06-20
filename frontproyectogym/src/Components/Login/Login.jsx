import Contenedor from '../Contenedor/Contenedor'
import CampoInput from '../CampoInput/CampoInput'
import {useForm} from 'react-hook-form'
import postUsuario from '../../Datos/PostUsuario'
import {Link} from 'react-router-dom'
import styles from '../Login/Login.module.css'
import { useContext, useEffect } from 'react'
import { AuthContext } from '../../Auth/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function Login()
{
    const {register, formState: {errors}, handleSubmit} = useForm()
    const {user ,setUser} = useContext(AuthContext);
    const navigate = useNavigate();

    const onsubmit = handleSubmit(async(data) =>{
        const url = 'https://localhost:7051/api/v1/Account/authenticate'
        
        try {
            const result = await postUsuario(url, data);
            setUser(result);
        } catch (error) {
            console.error('Error al autenticar:', error);
        }
        });
        console.log(user)
        useEffect(() => {
            if(user){
                navigate('/PaginaPrincipal')
            }
        }, [user])
    return<Contenedor >
    <form onSubmit={onsubmit} className={`${styles.formulario} mt-5  d-flex flex-column align-items-center `}>
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

