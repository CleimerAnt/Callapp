import { AuthContext } from "../../Auth/AuthContext"
import { useContext } from "react"


export default function CerrarSesion(){
    const url = 'https://localhost:7051/api/v1/Account/CerrarSesion'
    const {setUser} = useContext(AuthContext)

    function Cerrar(){
        setUser(null)
    }

    return <>
        <button className="btn btn-danger" onClick={() => Cerrar(url)}>Cerrar Sesion</button>
    </>
}

