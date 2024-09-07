import styles from '../HeaderPaginaPrincipal/HeaderPaginaPrincipal.module.css'
import { Link } from "react-router-dom";
import fuegoCalorico from '../../assets/fuegoCalorico.png';
import { AppBar, Box, Toolbar } from '@mui/material';
import NavListDrawer from '../NavListDrawer/NavListDrawer';
import CerrarSesion from '../CerrarSesion/CerrarSesion';

export default function HeaderPaginaPrincipal({fecha}){

    const navLinks = [
        {
            titulo: 'Página Principal', enlace : `/PaginaPrincipal/${fecha}`
        },
        {
            titulo: 'Alimentos', enlace : `/accionesAlimentos/${fecha}`
        }
        ,{
            accion : <CerrarSesion />
        }
    ];


    return <>

<Box component={'header'} className={`${styles.header} container-fluid d-flex flex-column flex-md-row align-items-center justify-content-around d-none d-md-flex`}>
        <Box component={'div'} className="d-flex align-items-center flex-row-reverse">
            <h1 className={`${styles.titulo} ms-3`}>Call</h1>
            <img className={`${styles.logo} img-fluid`} src={fuegoCalorico} alt="Fuego Calórico" />
        </Box>
        <Box component={'nav'} className={`${styles.links} mt-4 mt-md-0 d-flex flex-column flex-md-row align-items-center justify-content-center`}>
            <Link to={`/PaginaPrincipal/${fecha}`} className="mb-3 mb-md-0">Página Principal</Link>
            <Link to={`/accionesAlimentos/${fecha}`} className="mb-3 mb-md-0 ms-md-4">Mantenimiento de alimentos</Link>
            <CerrarSesion texto={true}/>
        </Box>
    </Box>

    <AppBar sx={{display : {xs: 'block', sm : 'none'}}} position={'fixed'}>
        <Toolbar sx={{alignItems : 'center', justifyContent: 'center'}}>
            <Box  >
        <NavListDrawer navLinks={navLinks}/>
            </Box>
        </Toolbar>
    </AppBar>
    
</>

}   
