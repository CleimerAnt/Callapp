import styles from '../HeaderInicio/HeaderInicio.module.css'
import fuegoCalorico from '../../assets/fuegoCalorico.png';
import { Link } from 'react-router-dom';
import NavListDrawer from '../NavListDrawer/NavListDrawer';
import { AppBar, Box, Drawer, Typography } from '@mui/material';
import { useState } from 'react';

export default function HeaderInicio({ home = false }) {

    const navLinks = [
        {
            titulo: 'Inicio', enlace : '/'
        },
        {
            titulo: 'Iniciar Sesión', enlace : '/Login'
        },
        {
            titulo: 'Crear Cuenta', enlace : '/Registro'
        },
    ];

    return (
        <>

<Box
  component={'header'}
  className={`container-fluid d-flex flex-column flex-md-row align-items-center justify-content-around d-none d-md-flex`}
>
  <Box component={'div'} className="d-flex align-items-center">
    <img className={`${styles.logo} img-fluid`} src={fuegoCalorico} alt="fuego calórico" />
    <h1 className={`${styles.titulo} ms-3`}>
      {home ? <Link className={styles.inicio} to={'/Inicio'}>Inicio</Link> : 'Call'}
    </h1>
  </Box>
  <Box component={'div'} className={`${styles.links} d-flex mt-3 mt-md-0`}>
    <Link to={'/Login'}>Iniciar Sesión</Link>
    <Link to={'/Registro'} className="ms-3">Crear Cuenta</Link>
  </Box>
</Box>


    <Box sx={{display : {xs: 'block', sm : 'none'}}}>
        <NavListDrawer navLinks={navLinks}/>
    </Box>
    

</>         
    );
}


{/*
       
    */}