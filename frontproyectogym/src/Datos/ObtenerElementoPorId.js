export default async function obtenerElementoById(url,token){
    const response = await fetch(url, {
        method : 'GET',
        headers : {
            'Authorization': `Bearer ${token}`
        }
    })

    const data = await response.json();

    return data;
}
