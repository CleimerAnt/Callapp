import {Routes, Route} from 'react-router-dom'
import Login from './Components/Login/Login'
import Contenedor from './Components/Contenedor/Contenedor'
import FormularioRegistro from'./Components/FormularioRegistro/FormularioRegistro'

export default function App(){
  return<Routes>
    <Route path='/' element={<Login />}/>
    <Route path='/Registro' element={<FormularioRegistro />}></Route>
  </Routes>
}