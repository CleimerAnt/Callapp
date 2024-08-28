import styles from '../HeaderInicio/HeaderInicio.module.css'
import fuegoCalorico from '../../assets/fuegoCalorico.png';
import { Link } from 'react-router-dom';

export default function HeaderInicio({ home = false }) {
    return (
        <>
    <header className="container-fluid d-flex flex-column flex-md-row align-items-center justify-content-around">
        <div className="d-flex align-items-center">
            <img className={`${styles.logo} img-fluid`} src={fuegoCalorico} alt="fuego calórico" />
            <h1 className={`${styles.titulo} ms-3`}>
                {home ? <Link className={styles.inicio} to={'/Inicio'}>Inicio</Link> : 'Call'}
            </h1>
        </div>
        <nav className={`${styles.links} d-flex mt-3 mt-md-0`}>
            <Link to={'/Login'}>Iniciar Sesión</Link>
            <Link to={'/Registro'} className="ms-3">Crear Cuenta</Link>
        </nav>
    </header>
</>     
    );
}
