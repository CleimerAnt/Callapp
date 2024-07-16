import { useForm } from "react-hook-form";
import postDataAutorizacion from "../../Datos/PostDataAutorizacion";
import { useContext } from "react";
import { AuthContext } from "../../Auth/AuthContext";

export default function Modal({id, body, titulo, url}){
    const {register, handleSubmit, formState: {errors}} = useForm();
    const modalId = `modal-${id}`;
    const {user} = useContext(AuthContext);

    const onSubmit = handleSubmit(async(data = []) =>  {
        console.log(data)
        const alimentosIdObjeto = [data.alimentosId];
        data.alimentosId = alimentosIdObjeto;
        try{
            const response = await postDataAutorizacion(url, data, user);
            console.log(await response);
        }
        catch(err){
            console.error(err);
        }
    });

    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                Agregar
            </button>
            <form onSubmit={onSubmit}>
                <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}-label`} aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5" id={`${modalId}-label`}>{titulo}</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                {body({ register, errors })}
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                                <button type="submit" className="btn btn-primary">Agregar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}
