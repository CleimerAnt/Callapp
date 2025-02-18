export default async function EditarDataAutorizacion(url, data = {}, user, img = false) {

    const headers = img ? {
        method: 'PUT',
        headers : {
            'Authorization': `Bearer ${user.jwToken}`
        },
        body: data,
    } : {
        
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${user.jwToken}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    };
    
    try{
        const response = await fetch(url, headers);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error al hacer la solicitud:', errorText);
            return errorText;
        }

        return await response;
        }
        catch(error){
            console.error('Error inesperado: ', error)
            throw error;
        }
}

