import { useContext } from "react"
import CerrarSesion from "../CerrarSesion/CerrarSesion"
import Contenedor from "../Contenedor/Contenedor"
import { AuthContext } from "../../Auth/AuthContext"
import { useNavigate } from "react-router-dom"
import FormularioCalorias from "../FormularioCalorias/FormularioCalorias"


export default function PaginaPrincipal(){
    const {user} = useContext(AuthContext)
    console.log(user)
    const navigate = useNavigate();
    const login = () =>{
        navigate('/')
    }

    const registro = () =>{
        navigate('/Registro')
    }
    return <Contenedor elemento="header">
    <h1>Pagina Principal</h1>
    <p>Nombre de Usuario: {user.userName}</p>
    <CerrarSesion />
    <button onClick={login}>Login</button>
    <button onClick={registro}>Registro</button>

    <FormularioCalorias />
    </Contenedor>
}