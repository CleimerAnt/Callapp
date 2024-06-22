
export default async function postDataAutorizacion(url, data = {}, user){
    const response = await fetch(url, {
        method: 'POST',
        headers : {
            'Authorization' : `Bearer ${user.jwToken}`,
            'Content-Type' : 'application/json'
        },
        body : JSON.stringify(data)
    });

    if(!response.ok){
        throw new Error('Error al hacer la solicitud');
    }

    return response;
}

