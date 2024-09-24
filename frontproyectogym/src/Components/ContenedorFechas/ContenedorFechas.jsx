import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../ContenedorFechas/ContenedorFechas.module.css';

const fechaIso = (date) => {
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
    const parts = formatter.formatToParts(date);

    return `${parts[4].value}-${parts[0].value}-${parts[2].value}T${parts[6].value}:${parts[8].value}:${parts[10].value}.000Z`;
};

const ContenedorFechas = () => {
    const navigate = useNavigate();
    const { date: urlDate } = useParams();
    const [selectedDate, setSelectedDate] = useState(new Date());
    const isFirstRender = useRef(true); 

    useEffect(() => {
        if (isFirstRender.current) {
            if (!urlDate || isNaN(new Date(urlDate))) {
                const currentDate = new Date();
                setSelectedDate(currentDate);
                navigate(`/PaginaPrincipal/${fechaIso(currentDate)}`, { replace: true });
            } else {
                const parsedDate = new Date(urlDate);
                setSelectedDate(parsedDate);
            }
            isFirstRender.current = false; 
        }
    }, [urlDate, navigate]);

    const formatDateForURL = (date) => {
        return fechaIso(date);
    };

    const goToPreviousDay = () => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() - 1);
            navigate(`/PaginaPrincipal/${formatDateForURL(newDate)}`);
            return newDate;
        });
    };

    const goToNextDay = () => {
        setSelectedDate(prevDate => {
            const newDate = new Date(prevDate);
            newDate.setDate(newDate.getDate() + 1);
            navigate(`/PaginaPrincipal/${formatDateForURL(newDate)}`);
            return newDate;
        });
    };

    const formatDateForDisplay = (date) => {
        return new Intl.DateTimeFormat('es-DO', {
            timeZone: 'America/Santo_Domingo',
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        }).format(date);
    };

    return (
        <div className={`${styles.datePicker}`}>
            <button onClick={goToPreviousDay}>◀</button>
            <span>{formatDateForDisplay(selectedDate)}</span>
            <button onClick={goToNextDay}>▶</button>
        </div>
    );
};

export default ContenedorFechas;
