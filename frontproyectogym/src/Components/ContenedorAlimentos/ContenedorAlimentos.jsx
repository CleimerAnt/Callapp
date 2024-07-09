import React from 'react';

export default function ContenedorAlimentos({ aray = [], thead = [], ancho, elementos = [] }) {
    
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
                        <tr key={index}>
                            {elementos.map((key, idx) => (
                                <td key={idx}>{element[key]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    );
}
