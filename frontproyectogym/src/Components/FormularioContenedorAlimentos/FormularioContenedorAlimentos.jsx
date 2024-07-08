import { useParams } from "react-router-dom";
import { AuthContext } from "../../Auth/AuthContext";
import { useContext, useEffect } from "react";
import getDatosUser from "../../Datos/ObtenerCalculoCalorias";

export default function FormularioContenedorAlimentos(){
    const {user} = useContext(AuthContext)
    const {comida} = useParams()
    const url = `https://localhost:7051/api/v1/Alimentos/Obtener Alimentos?id=${user.id}`
    useEffect(() => {
        getDatosUser(url, user.jwToken)
            .then(res => {
                console.log(res)
            })
            .catch(err => console.error(err))
    })
    console.log(comida)
    return<>
    <button className="btn btn-primary">Agregar alimento</button>
    </>
}