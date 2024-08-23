import { Link } from "react-router-dom";

export default function ConfirmarCuenta(){
    const urlActual = window.location.href;

    obtenerTokenUserId(urlActual);

    return <>
    <div className="card text-center container mt-4 w-50">
    <div className={`card-header`}>
        Confirmar Cuenta
    </div>
    <div className="card-body">
        <h5 className="card-title">Cuenta Confirmada</h5>
        <p className="card-text">Vorver al Formulario de Inicico de sesion</p>
        <Link className="btn btn-primary" to={'/'}>Inicial Sesion</Link>
    </div>

    </div>
    </>

}

function confrimar(url,Id){
    fetch(url, {
        method : 'POST',
        headers: {
            'content-type' : 'application/json'
        },
        body : JSON.stringify(Id)
    })
    .then(respuesta => {
        if(!respuesta.ok){
            throw new Error('Error al Activar la Cuenta')
        }
        return respuesta
    })
    .catch(data => {
        console.log('Succes', data)
    })
    .catch((error) => {
        console.error('Error:', error)
    })
}

function obtenerTokenUserId(urlActual){
    const urlParseada = new URL(urlActual);
    const userId = urlParseada.searchParams.get('userId');
    const token = urlParseada.searchParams.get('token');

    const url = `https://localhost:7051/api/v1/Account/ConfirmarCuenta?userId=${userId}&token=${token}`
    confrimar(url)
}