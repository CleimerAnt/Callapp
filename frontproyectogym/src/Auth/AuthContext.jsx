import { createContext, useState, useEffect } from 'react';
import getDatosUser from '../Datos/ObtenerCalculoCalorias';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(null);
    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
    const handleResize = () => setWidth(window.innerWidth);

    window.addEventListener('resize', handleResize);

    // Limpieza del efecto para evitar fugas de memoria
    return () => {
        window.removeEventListener('resize', handleResize);
    };
    }, []);

    const estaAutenticado = () => {
        return user !== null && user.isVerified;
    };


    return (
        <AuthContext.Provider value={{ user, setUser, estaAutenticado, width }}>
            {children}
        </AuthContext.Provider>
    );
}
