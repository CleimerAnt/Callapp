import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../ContenedorFechas/ContenedorFechas.module.css';

const ContenedorFechas = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const formatDate = (date) => {
        return date.toISOString(); 
    };
    
    const goToPreviousDay = () => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            navigate(`/PaginaPrincipal/${formatDate(newDate)}`);
            return newDate;
        });
    };

    const goToNextDay = () => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            navigate(`/PaginaPrincipal/${formatDate(newDate)}`);
            return newDate;
        });
    };

    return (
        <div className={`${styles.datePicker}`}>
            <button onClick={goToPreviousDay}>◀</button>
            <span>{selectedDate.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
            <button onClick={goToNextDay}>▶</button>
        </div>
    );
};

export default ContenedorFechas;