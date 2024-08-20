import styles from '../HeaderPaginaPrincipal/HeaderPaginaPrincipal.module.css'
import { Link } from "react-router-dom";
import fuegoCalorico from '../../assets/fuegoCalorico.png';

export default function HeaderPaginaPrincipal({fecha}){
    return<>
    <header  className={`${styles.header} container-fluid d-flex flex-column flex-md-row align-items-center justify-content-between`}>
    <div className="d-flex align-items-center flex-row-reverse">
        <h1 className={`${styles.titulo} ms-3`}>Call</h1>
        <img className={`${styles.logo} img-fluid`} src={fuegoCalorico} alt="fuegoCalorico" />
    </div>
    <nav className={`${styles.links} mt-4 mt-md-0 d-flex flex-column flex-md-row align-items-center justify-content-center`}>
        <Link to={`/PaginaPrincipal/${fecha}`} className="mb-3 mb-md-0">Pagina Principal</Link>
        <Link to={`/accionesAlimentos/${fecha}`} className="mb-3 mb-md-0 ms-md-4">Mantenimiento de alimentos</Link>
    </nav>
</header>

    </>
}
