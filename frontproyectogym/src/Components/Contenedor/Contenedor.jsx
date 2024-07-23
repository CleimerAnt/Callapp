import React from 'react';


export default function Contenedor({children, elemento: Elemento = 'div', center = '', margin})
{
    return <Elemento className={`container ${center} ${margin}`}>
        {children}
    </Elemento>
}