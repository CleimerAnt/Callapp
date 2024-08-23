import { AuthContext } from "../../Auth/AuthContext"
import { useContext } from "react"


export default function CerrarSesion(){
    const url = import.meta.env.VITE_API_BASE_CERRARSESION;
    const {setUser} = useContext(AuthContext)

    function Cerrar(){
        setUser(null)
    }

    return <>
        <button className="btn btn-secondary" onClick={() => Cerrar(url)}>Cerrar Sesion</button>
    </>
}

