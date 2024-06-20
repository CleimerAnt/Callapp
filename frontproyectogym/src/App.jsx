import {Routes, Route, Navigate} from 'react-router-dom'
import Login from './Components/Login/Login'      
import FormularioRegistro from'./Components/FormularioRegistro/FormularioRegistro'
import ConfirmarCuenta from './Components/ConfirmarCuenta/ConfirmarCuenta'
import PaginaPrincipal from './Components/PaginaPrincipal/PaginaPrincipal'
import RutaProtegida from './Components/RutaProtegida/RutaProtegida'
import { useContext } from 'react'
import { AuthContext } from './Auth/AuthContext'


export default function App(){
  const {estaAutenticado} = useContext(AuthContext)

  return<Routes>
    <Route path="/" element={estaAutenticado() ? < Navigate to="/PaginaPrincipal" /> : <Login />}/>
    <Route path="/Registro" element={estaAutenticado() ? <Navigate to="/PaginaPrincipal" /> : <FormularioRegistro />}/>
    <Route path='/ConfirmarCuenta' element={<ConfirmarCuenta />}></Route>
    <Route path="/PaginaPrincipal" element={<RutaProtegida> <PaginaPrincipal /> </RutaProtegida>}/>
  </Routes>
}