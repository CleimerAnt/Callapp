export default async function postUsuario(url, formData) {
    try {
        const response = await fetch(url, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error al agregar contacto:', errorText);
            throw new Error('Error al agregar contacto: ' + errorText);
        }

        return response.json();
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
        throw error;
    }
}
