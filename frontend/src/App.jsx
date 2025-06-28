import { Route, Routes } from "react-router-dom"
import Home from './pages/Home'
import Userlogin from './pages/UserLogin'
import Usersignup from './pages/Usersignup'

import Captainlogin from './pages/CaptainLogin'
import Captainsignup from './pages/Captainsignup'


function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Home/>} />
        <Route path='/login' element={<Userlogin/>} />
        <Route path='/signup' element={<Usersignup/>} />
        
        <Route path='/captain-login' element={<Captainlogin/>} />
        <Route path='/captain-signup' element={<Captainsignup/>} />


      </Routes>
     
    </div>
  )
}

export default App
