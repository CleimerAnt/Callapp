export default async function login(url, data){
    try {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });

    if (!response.ok) {
        const errorText = await response.text();
        console.error('Error al realizar el Login:', errorText);
        throw new Error('Error al realizar el Login');
    }

    return await response.json();
} catch (err) {
    console.error('Error: ', err);
    throw err;
}
};
