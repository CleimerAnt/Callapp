import React, { useContext } from 'react';
import FormularioAgregarAlimentos from '../FormularioAgregarAlimentos/FormularioAgregarAlimentos';
import { AuthContext } from '../../Auth/AuthContext';

export default function ContenedorAlimentos({ aray = [], thead = [], ancho, elementos = [], acciones }) {
    const {user} = useContext(AuthContext);
    console.log(aray)
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
                        <>
                        {typeof(element) === 'function' ?? element()}
                        <tr key={index}>
                            {elementos.map((key, idx) => (
                                <>
                                    <td>{element[key] === 'funcion' ? <FormularioAgregarAlimentos id={element.id} userId={user.id} comida={element.horaio}/>  : element[key]}</td>
                                </>
                            ))}
                        </tr>
                        </>
                        
                    ))}
                </tbody>
            </table>
        </>
    );
}
