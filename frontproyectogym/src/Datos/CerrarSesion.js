export default function CerrarSesion(url, user){
    fetch(url, {
        method : 'POST',
        headers : {
            'Authorization': `Bearer ${user.jwToken}`,
            'Content-Type': 'application/json'
        }
    })
}