import { AuthContext } from "../../Auth/AuthContext"
import { useContext } from "react"
import CerrarSesionUsuario from "../../Datos/CerrarSesion";

export default function CerrarSesion(){
    const url = import.meta.env.VITE_API_BASE_CERRARSESION;
    const {user} = useContext(AuthContext)
    const {setUser} = useContext(AuthContext)

    function Cerrar(url){
        setUser(null)
        CerrarSesionUsuario(url,user)
    }

    return <>
        <button className="btn btn-secondary" onClick={() => Cerrar(url)}>Cerrar Sesión</button>
    </>
}

