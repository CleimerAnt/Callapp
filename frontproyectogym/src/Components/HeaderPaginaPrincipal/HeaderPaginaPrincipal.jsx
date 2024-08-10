import styles from '../HeaderPaginaPrincipal/HeaderPaginaPrincipal.module.css'
import { Link, useParams } from "react-router-dom";
import fuegoCalorico from '../../assets/fuegoCalorico.png';

export default function HeaderPaginaPrincipal({fecha}){
    return<>
    <section className='d-flex flex-row-reverse'>
            <h1 className={styles.titulo}>Call</h1>
            <img className={styles.logo} src={fuegoCalorico} alt="fuegoCalorico" />
        </section>

        <section className={`${styles.links}`}>
            <Link to={`/PaginaPrincipal/${fecha}`}>Pagina Principal</Link>
            <Link to={`/accionesAlimentos/${fecha}`}>Mantenimiento de alimentos</Link>
        </section>
    </>
}

/*<Link to={`/PaginaPrincipal/${fecha}`}>Pagina Principal</Link>
                <Link to={`/accionesAlimentos/${fecha}`}>Mantenimiento de alimentos</Link>*/