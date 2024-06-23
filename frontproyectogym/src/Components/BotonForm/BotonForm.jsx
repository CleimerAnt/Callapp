
export default function BotonForm({texto, tipoBoton}){
    return<>
    <div className={`mb-3 d-flex`}>
        <button className={`${tipoBoton} `} type="submit">{texto}</button>
    </div> 
    </>   
}