
export default async function EliminarDatos(url, user){
    const response = await fetch(url, {
        method : 'DELETE',
        headers : {
            'Authorization': `Bearer ${user.jwToken}`,
            'Content-Type': 'application/json'
        }
    })

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al hacer la solicitud:', errorText);
        throw new Error('Error al hacer la solicitud: ' + errorText);
    }

    return await response.json();
}
