import { AuthContext } from "../../Auth/AuthContext"
import { useContext } from "react"
import CerrarSesionUsuario from "../../Datos/CerrarSesion";
import styles from '../CerrarSesion/CerrarSesion.module.css'

export default function CerrarSesion({texto = false, movil = false}){
    const url = import.meta.env.VITE_API_BASE_CERRARSESION;
    const {user, setUser} = useContext(AuthContext)

    function Cerrar(url){
        CerrarSesionUsuario(url,user)
        localStorage.removeItem('user');
        localStorage.clear();
        setUser(null)
    }

    return <>
        {texto ? <button className={movil ? styles.movil : styles.boton} onClick={() => Cerrar(url)}>Cerrar Sesión</button> : <button className="btn btn-secondary"  onClick={() => Cerrar(url)}>Cerrar Sesión</button>}
    </>
}

