function getDatosUser(url) {

    return fetch(url)
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