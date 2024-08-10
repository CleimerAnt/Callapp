import React, { useContext } from 'react';
import FormularioAgregarAlimentos from '../FormularioAgregarAlimentos/FormularioAgregarAlimentos'
import { AuthContext } from '../../Auth/AuthContext';
import { Link } from 'react-router-dom';


export default function ContenedorAlimentos({ aray = [], thead = [], ancho, elementos = [], fecha  = new Date().toISOString()}) {
    const { user } = useContext(AuthContext);
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
                    {aray.length === 0 ? (
                        <tr>
                            <td colSpan={thead.length}>No hay alimentos</td>
                        </tr>
                    ) : (
                        aray.map((element, index) => (
                            <tr key={index}>
                                {elementos.map((key, idx) => (
                                    <td key={idx}>
                                        {element[key] === 'funcion' ? (
                                            <FormularioAgregarAlimentos 
                                                id={element.id} 
                                                userId={user.id} 
                                                comida={element.horaio} 
                                                grafica={[element.proteina, element.carbohidratos, element.grasa]}
                                                fecha={fecha}
                                            />
                                        ) : element[key] === "Eliminar" ? (
                                            <Link className='btn btn-danger' to={`/EliminarAlimentos/${element.alimentoId}/${element.contenedorId}`}>Eliminar</Link>
                                        ) : element[key] === "EliminarAlimentos" ? 
                                        (
                                            <Link className='btn btn-danger' to={`/EliminarAlimentoDelUsuario/${element.id}/${fecha}`}> Eliminar </Link>
                                        ) : element[key] === "Editar" ? (<Link className='btn btn-secondary' to={`/EditarAlimento/${element.id}/${fecha}`}>Editar</Link>) : (
                                            element[key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </>
    );
}
