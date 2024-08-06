import styles from '../HeaderInicio/HeaderInicio.module.css'
import fuegoCalorico from '../../assets/fuegoCalorico.png';
import { Link } from 'react-router-dom';


export default function HeaderInicio({home = false}){
    return<>
        <section className='d-flex flex-row-reverse'>
            <h1 className={styles.titulo}>{home ? <Link className={styles.inicio} to={'/Inicio'}>Inicio</Link> : 'Call'}</h1>
            <img className={styles.logo} src={fuegoCalorico} alt="fuegoCalorico" />
        </section>

        <section className={`${styles.links}`}>
            <Link to={'/Login'}>Iniciar Sesion</Link>
            <Link to={'/Registro'}>Crear Cuenta</Link>
        </section>
    </>
}