import styles from '../HeaderPaginaPrincipal/HeaderPaginaPrincipal.module.css'
import { Link, useParams } from "react-router-dom";

export default function HeaderPaginaPrincipal({fecha}){
    return<>
    <header className={`mt-3 mb-4`}>
            <ul className={`${styles.enlaces}`}>
                <Link to={`/PaginaPrincipal/${fecha}`}>Pagina Principal</Link>
                <Link to={`/accionesAlimentos/${fecha}`}>Mantenimiento de alimentos</Link>
            </ul>
        </header>

    </>
}