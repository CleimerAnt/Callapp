import styles from '../Footer/Footer.module.css'

export default function Footer(){
    return (
        <footer className={`${styles.footer} container-fluid flex-column  mt-4 d-flex align-items-center justify-content-center ${styles.footer}`}>
            <p className={styles.nombre}>
    CLEIMER ANT. &copy; 2024
</p>
            <div className={`${styles.links}`}>
                <a style={{color : '#010409'}} target='_blank' href='https://github.com/CleimerAnt'><i class="fa-brands fa-github"></i></a>
                <a style={{color : '#F70077'}} target='_blank' href='https://www.instagram.com/cleimer.ant/'><i class="fa-brands fa-instagram"></i></a>
                <a style={{color : '#0A66C2'}} target='_blank' href='https://www.linkedin.com/in/cleimes-lorenzo-28a7b8265/'><i class="fa-brands fa-linkedin"></i></a>

                <a style={{color : '#010409'}} target='_blank' href='https://portafolio-silk-six.vercel.app/'><i class="fa-solid fa-user-tie"></i></a>

            </div>
        </footer>
    );
}
