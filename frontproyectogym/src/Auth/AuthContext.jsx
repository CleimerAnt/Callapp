import { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState(() => {
        const userStorage = localStorage.getItem('user');
        return userStorage ? JSON.parse(userStorage) : null
    });

    const [width, setWidth] = useState(window.innerWidth);

    useEffect(() => {
        const userStorage = JSON.parse(localStorage.getItem('user'));
        if (userStorage) {
            setUser(userStorage);
        }
    }, []);

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


    const fechaIso = () => {
        const options = {
            timeZone: 'America/Santo_Domingo',
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
        };
    
        const formatter = new Intl.DateTimeFormat('en-US', options);
        const parts = formatter.formatToParts(new Date());
    
        const fechaRD = `${parts[4].value}-${parts[0].value}-${parts[2].value}T${parts[6].value}:${parts[8].value}:${parts[10].value}.000Z`;
    
        return fechaRD;
    };

    return (
        <AuthContext.Provider value={{ user, setUser,estaAutenticado, width, fechaIso }}>
            {children}
        </AuthContext.Provider>
    );
}
