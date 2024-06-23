

export default function Contenedor({children, elemento: Elemento = 'div', center})
{
    return <Elemento className={`container ${center}`}>
        {children}
    </Elemento>
}