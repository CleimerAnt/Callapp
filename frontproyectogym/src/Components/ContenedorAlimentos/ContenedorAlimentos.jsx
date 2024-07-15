import React, { useContext } from 'react';
import FormularioAgregarAlimentos from '../FormularioAgregarAlimentos/FormularioAgregarAlimentos';
import { AuthContext } from '../../Auth/AuthContext';
import FormularioEliminarAlimento from '../FormularioEliminarAlimento/FormularioEliminarAlimento';

export default function ContenedorAlimentos({ aray = [], thead = [], ancho, elementos = [] }) {
    const { user } = useContext(AuthContext);
    console.log(aray);

    return (
        <>
            <table className="table table-striped" style={{ width: `${ancho}` }}>
                <thead>
                    <tr>
                        {thead.map((element, index) => (
                            <th key={index}>{element}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {aray.map((element, index) => (
                        <React.Fragment key={index}>
                            {typeof element === 'function' && element()}
                            <tr>
                                {elementos.map((key, idx) => (
                                    <td key={idx}>
                                        {element[key] === 'funcion' ? (
                                            <FormularioAgregarAlimentos 
                                                id={element.id} 
                                                userId={user.id} 
                                                comida={element.horario} 
                                            />
                                        ) : element[key] === "Eliminar" ? (
                                            <FormularioEliminarAlimento alimentoId={element.alimentoId} contenedorId={element.contenedorId}/>
                                        ) : (
                                            element[key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        </React.Fragment>
                    ))}
                </tbody>
            </table>
        </>
    );
}
