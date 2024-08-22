import React, { useContext } from 'react';
import FormularioAgregarAlimentos from '../FormularioAgregarAlimentos/FormularioAgregarAlimentos'
import { AuthContext } from '../../Auth/AuthContext';
import { Link } from 'react-router-dom';
import styles from '../ContenedorAlimentos/ContenedorAlimentos.module.css'
import ModalReact from '../ModalReact/ModalReact';


export default function ContenedorAlimentos({ aray = [], thead = [], ancho, elementos = [], fecha  = new Date().toISOString()}) {
    const { user, width } = useContext(AuthContext);

    return (
        <>
        

            {width <= 767 ? <div className={`p-2 ${styles.contenedorSubtabla}`}>
                {aray.map((element, index) => (
                    <div key={element.id} className={`d-flex align-items-center justify-content-between ${styles.subTabla}`}>
                        <div>
                            <p className='fw-bold'>{element.nombreAlimento}</p>

                            <div key={index}>
                            <p className='text-primary fw-bold'>Calorias: {element.caloriasDelAlimento}</p>
                            <div className='d-flex' style={{gap : '10px'}}>
                                <p>C: <span className={`${styles.carbohidratos}`}>{element.carbohidratosDelAlimento}</span></p>
                                <p>P: <span className={`${styles.proteina}`}>{element.proteinaDelAlimento}</span></p>
                                <p>G: <span className={`${styles.grasa}`}>{element.grasaDelAlimento}</span></p>
                            </div>
                        </div>
                        </div>

                        <div className='d-flex align-items-center justify-content-center'>
                            <Link className='btn btn-danger' to={`/EliminarAlimentos/${element.alimentoId}/${element.contenedorId}`}>Eliminar</Link>
                        </div>
                        
                    </div>
                ))}
            </div> : width > 1024 ?  <table className={`table table-hover ${styles.tabla}`} style={{ width: `${ancho}` }}>
                <thead>
                    <tr>
                        {thead.map((element, index) => (
                            <th key={index}>{element}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {aray.length === 0 ? (
                        <tr>
                            <td colSpan={thead.length}>No hay alimentos</td>
                        </tr>
                    ) : (
                        aray.map((element, index) => (
                            <tr key={index}>
                                {elementos.map((key, idx) => (
                                    <td key={idx}>
                                        {element[key] === 'funcion' ? (
                                            
                                                <ModalReact id={element.id} tituloBoton={'Agregar'}/>
                                                
                                                
                                        ) : element[key] === "Eliminar" ? (
                                            <Link className='btn btn-danger' to={`/EliminarAlimentos/${element.alimentoId}/${element.contenedorId}`}>Eliminar</Link>
                                        ) : element[key] === "EliminarAlimentos" ? 
                                        (
                                            <Link className='btn btn-danger' to={`/EliminarAlimentoDelUsuario/${element.id}/${fecha}`}> Eliminar </Link>
                                        ) : element[key] === "Editar" ? (<Link className='btn btn-secondary' to={`/EditarAlimento/${element.id}/${fecha}`}>Editar</Link>) : (
                                            element[key]
                                        )}
                                    </td>
                                ))}
                            </tr>
                        ))
                    )}
                </tbody>
            </table> : '' }
            
        </>
    );
}

{/*
    <FormularioAgregarAlimentos 
                                                id={element.id} 
                                                userId={user.id} 
                                                comida={element.horaio} 
                                                grafica={[element.proteina, element.carbohidratos, element.grasa]}
                                                fecha={fecha}
                                            />
    */}