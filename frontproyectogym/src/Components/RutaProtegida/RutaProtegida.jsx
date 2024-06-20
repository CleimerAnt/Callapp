import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../Auth/AuthContext';

function RutaProtegida({ children }) {
    const { estaAutenticado } = useContext(AuthContext);

    if (!estaAutenticado()) {
        return <Navigate to="/" />;
    }

    return children;
}

export default RutaProtegida;
