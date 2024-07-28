import styles from '../BarraValores/BarraValores.module.css'

export default function BarraValores({proteina = 0, carbohidratos = 0, grasas = 0, calorias = 0}){

    return<>
        <ul className={`${styles.listaValores}`}>
            <li style={{color: '#CB5521', fontWeight: 'bold'}}>Carbohidratos: {carbohidratos}</li>
            <li style={{color: '#0066CC', fontWeight: 'bold'}}>Proteinas: {proteina}</li>
            <li style={{color: '#E1BC39', fontWeight: 'bold'}}>Grasas: {grasas}</li>
            <li style={{color: '#0066CC', fontWeight: 'bold'}}>Calorias: {calorias}</li>
        </ul>
    </>
}