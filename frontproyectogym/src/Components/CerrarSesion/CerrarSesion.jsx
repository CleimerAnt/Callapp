import { AuthContext } from "../../Auth/AuthContext"
import { useContext } from "react"
import CerrarSesionUsuario from "../../Datos/CerrarSesion";

export default function CerrarSesion(){
    const url = import.meta.env.VITE_API_BASE_CERRARSESION;
    const {user, setUser} = useContext(AuthContext)

    function Cerrar(url){
        CerrarSesionUsuario(url,user)
        localStorage.removeItem('user');
        localStorage.clear();
        setUser(null)
    }

    return <>
        <button className="btn btn-secondary" onClick={() => Cerrar(url)}>Cerrar Sesión</button>
    </>
}

