import { createContext, useState, useEffect } from 'react';
import getDatosUser from '../Datos/ObtenerCalculoCalorias';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);

    const estaAutenticado = () => {
        return user !== null && user.isVerified;
    };


    return (
        <AuthContext.Provider value={{ user, setUser, estaAutenticado }}>
            {children}
        </AuthContext.Provider>
    );
}
