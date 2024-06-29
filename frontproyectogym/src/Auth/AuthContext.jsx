import { createContext, useState, useEffect } from 'react';
import getDatosUser from '../Datos/ObtenerCalculoCalorias';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [state, setState] = useState(null);
    console.log(state)
    useEffect(() => {
        if (user) {
            const url = `https://localhost:7051/api/v1/Usuario/ObtenerUsuarios?id=${user.id}`;
            getDatosUser(url).then(response => {
                if (response && response.status === 204) {
                    setState(204);
                } else {
                    setState(200);
                }
            }).catch(err => {
                console.error('Error', err);
                setState(null);
            });
        }
    }, [user]);

    const estaAutenticado = () => {
        return user !== null && user.isVerified;
    };

    const calculoCalorias = () => {
        if (state === 204) {
            return false;
        } else if (state === 200) {
            return true;
        } else {
            return null;
        }
    };

    return (
        <AuthContext.Provider value={{ user, setUser, estaAutenticado, calculoCalorias }}>
            {children}
        </AuthContext.Provider>
    );
}
