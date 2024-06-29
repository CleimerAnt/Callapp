function getDatosUser(url, token) {
    return fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
        }
    })
    .then(res => {
        if (res.status === 204) {
            return { status: 204 };
        }
        return res.json();
    })
    .catch(err => {
        console.error('error', err);
        return null;
    });
}

export default getDatosUser;
