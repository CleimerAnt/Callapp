export default async function EditarDataAutorizacion(url, data = {}, user) {
    console.log('Datos enviados:', data);
    try{
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${user.jwToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error al hacer la solicitud:', errorText);
            return await response;
        }

        return await response;
        }
        catch(error){
            console.error('Error inesperado: ', error)
            throw error;
        }
}

