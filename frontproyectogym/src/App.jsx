import { Routes, Route, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Login from './Components/Login/Login';
import FormularioRegistro from './Components/FormularioRegistro/FormularioRegistro';
import ConfirmarCuenta from './Components/ConfirmarCuenta/ConfirmarCuenta';
import PaginaPrincipal from './Components/PaginaPrincipal/PaginaPrincipal';
import RutaProtegida from './Components/RutaProtegida/RutaProtegida';
import { AuthContext } from './Auth/AuthContext';
import FormularioCalorias from './Components/FormularioCalorias/FormularioCalorias';
import FormularioContenedorAlimentos from './Components/FormularioContenedorAlimentos/FormularioContenedorAlimentos';
import FormularioEliminarAlimento from './Components/FormularioEliminarAlimento/FormularioEliminarAlimento';
import AccionesAlimentos from './Components/AccionesAlimentos/AccionesAlimentos';
import FormularioEliminarAlimentoDelUsuario from './Components/FormularioEliminarAlimentoDelUsuario/FormularioEliminarAlimentoDelUsuario';
import EditarAlimento from './Components/EditarAlimento/EditarAlimento';
import ContenedorPrincipal from './Components/ContenedorPrincipal/ContenedorPrincipal';
import Inicio from './Components/Inicio/Inicio';

export default function App() {
  const { estaAutenticado, calculoCalorias } = useContext(AuthContext);

  const renderComponent = () =>{
    if(estaAutenticado()){
        const calorias = calculoCalorias();
        if(calorias === null){
          return <div>Loading</div>
        }
        else if(calorias){
          return <Navigate to={`/PaginaPrincipal/${new Date().toISOString()}`} />
        }
        else{
          return <Navigate to={'/FormularioCalorias'} />
        }
        }
        else {
          return <Inicio />
        }
  }

  return (
    <Routes>
      <Route path="/" element={renderComponent()}/>
      <Route path='/Login' element={<Login />}/> 
      <Route path='/agregarAlimentos/:comida/:fecha' element = {<RutaProtegida ><FormularioContenedorAlimentos /></RutaProtegida>} />
      <Route path='/accionesAlimentos/:fecha' element={<RutaProtegida> <AccionesAlimentos /> </RutaProtegida>}/>
      <Route path="/Registro" element={estaAutenticado() ? <Navigate to="/PaginaPrincipal" /> : <FormularioRegistro />} />
      <Route path="/FormularioCalorias" element={<RutaProtegida><FormularioCalorias /></RutaProtegida>} />
      <Route path="/EliminarAlimentos/:alimentoId/:contenedorId" element={<RutaProtegida><FormularioEliminarAlimento /></RutaProtegida>} />
      <Route path={`/ContenedorPrincipal/:fecha`} element={<RutaProtegida><ContenedorPrincipal /></RutaProtegida>} />
      <Route path='/EliminarAlimentoDelUsuario/:alimentoId/:fecha' element={<RutaProtegida> <FormularioEliminarAlimentoDelUsuario /> </RutaProtegida>}/>
      <Route path='/EditarAlimento/:alimentoId/:fecha' element={<RutaProtegida> <EditarAlimento /> </RutaProtegida>}/>
      <Route path="/ConfirmarCuenta" element={<ConfirmarCuenta />} />
      <Route path="/PaginaPrincipal" element={<RutaProtegida><PaginaPrincipal /></RutaProtegida>} />
      <Route path="/PaginaPrincipal/:fecha" element={<RutaProtegida><PaginaPrincipal /></RutaProtegida>} />
      <Route path="*" element={<Navigate to={estaAutenticado() ? "/PaginaPrincipal" : "/"} />} />
    </Routes>
  );
}
