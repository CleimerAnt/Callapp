import Grafica from "../Grafica/Grafica";
import { useNavigate } from "react-router-dom";

export default function Modal({ id, body, titulo, tipoBoton, texto, grafica, fecha }) {
    const modalId = `modal-${id}`;
    const navigate = useNavigate();

    return (
        <>
            <button type="button" className={`btn btn-${tipoBoton}`} data-bs-toggle="modal" data-bs-target={`#${modalId}`}>
                {texto}
            </button>
            <div className="modal fade" id={modalId} tabIndex="-1" aria-labelledby={`${modalId}-label`} aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5" id={`${modalId}-label`}>{titulo}</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            {grafica ? <Grafica carbohidratos={grafica[1]} proteina={grafica[0]} grasa={grafica[2]}/> : ''}
                            
                            {body()}
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
