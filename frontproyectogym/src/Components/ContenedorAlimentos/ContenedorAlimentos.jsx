import React from 'react';

export default function ContenedorAlimentos({ aray = [], thead = [], ancho, elementos = [], acciones }) {

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
                                    <td>{typeof(element[key]) === 'function' ? element[key]() : element[key]}</td>
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
