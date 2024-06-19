import {Routes, Route} from 'react-router-dom'
import Login from './Components/Login/Login'      
import FormularioRegistro from'./Components/FormularioRegistro/FormularioRegistro'
import ConfirmarCuenta from './Components/ConfirmarCuenta/ConfirmarCuenta'
import PaginaPrincipal from './Components/PaginaPrincipal/PaginaPrincipal'


export default function App(){
  return<Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/Registro' element={<FormularioRegistro />}></Route>
    <Route path='/ConfirmarCuenta' element={<ConfirmarCuenta />}></Route>
    <Route path='/PaginaPrincipal' element={<PaginaPrincipal />}></Route>
  </Routes>
}