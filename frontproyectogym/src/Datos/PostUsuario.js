
export default async function postUsuario(url, data) {
    const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    });
    if (!response.ok) {
        throw new Error('Error al agregar contacto');
    }

    return response.json();
}
