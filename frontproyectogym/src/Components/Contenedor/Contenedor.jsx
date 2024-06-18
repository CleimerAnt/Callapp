

export default function Contenedor({children, elemento: Elemento = 'div'})
{
    return <Elemento className="container">
        {children}
    </Elemento>
}