export default function PostUsuario(url,data){
    fetch(url, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json' 
        },
        body: JSON.stringify(data) 
    })
    .then(response => {
        if (!response.ok) {
        
        throw new Error('Error al Agregar Contacto');
        }
        return response.json(); 
    })
    .then(data => {
        console.log('Success:', data);
    })
    .catch((error) => {
        console.error('Error:', error); 
    });
}