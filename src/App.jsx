import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Registros } from './pages/Registros'
import { Vencimientos } from './pages/Vencimientos'
import './App.css'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/registros' element={<Registros />} />
        <Route path='/vencimientos' element={<Vencimientos />} />
     </Routes>
    </>
  )
}

export default App
