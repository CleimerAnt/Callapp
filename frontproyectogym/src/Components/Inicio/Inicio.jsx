import Contenedor from '../Contenedor/Contenedor';
import fuegoCalorico from '../../assets/fuegoCalorico.png';
import check1 from '../../assets/Check.svg';
import check2 from '../../assets/Check 2.svg';
import check3 from '../../assets/Check 3.svg';
import Calorias1 from '../../assets/Calorias 1.png';
import styles from '../Inicio/Inicio.module.css';
import { Link } from 'react-router-dom';
import HeaderInicio from '../HeaderInicio/HeaderInicio';

export default function Inicio() {
  return (
    <>
      <Contenedor elemento='header' margin={'d-flex justify-content-around mt-4 align-items-center mb-4'}>
          <HeaderInicio />
      </Contenedor>

      <main className={`${styles.main}`}>
        <section className={`${styles.subContainer} container`}>
          <article>
            <h2 className={`h1 ${styles.subtitulo}`}>En busca de un mejor <br /> estilo de vida.</h2>
            <div className='mt-4 d-flex flex-column m-3'>
              <img className={`${styles.check} mt-4`} src={check1} alt="" />
              <img className={`${styles.check} mt-4`} src={check2} alt="" />
              <img className={`${styles.check} mt-4`} src={check3} alt="" />
            </div>
          </article>

          <article>
            <img className={`${styles.imagenCalorias}`} src={Calorias1} alt="" />
          </article>
        </section>
      </main>
    </>
  );
}
