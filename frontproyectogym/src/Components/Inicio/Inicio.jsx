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
    <div className={`d-flex flex-column flex-md-row align-items-center justify-content-center ${styles.principal}`}>
      <article className="text-center text-md-start">
        <h2 className={`h1 ${styles.subtitulo}`}>En busca de un mejor <br /> estilo de vida.</h2>
        <div className='mt-4 d-flex flex-column align-items-center align-items-md-start m-3'>
          <img className={`${styles.check} mt-4`} src={check1} alt="Descripción de la primera imagen" />
          <img className={`${styles.check} mt-4`} src={check2} alt="Descripción de la segunda imagen" />
          <img className={`${styles.check} mt-4`} src={check3} alt="Descripción de la tercera imagen" />
        </div>
      </article>

      <figure className="text-center mt-4 mt-md-0 ms-md-4">
        <img className={`${styles.imagenCalorias} img-fluid`} src={Calorias1} alt="Descripción de la imagen de calorías" />
      </figure>
    </div>
  </section>
</main>

    </>
  );
}
