import { Route, Routes } from "react-router-dom"
import Start from './pages/Start'
import Home from "./pages/Home"
import Userlogin from './pages/UserLogin'
import Usersignup from './pages/Usersignup'

import Captainlogin from './pages/CaptainLogin'
import Captainsignup from './pages/Captainsignup'
import UserProtectWrapper from "./pages/UserProtectWrapper"
import { UserLogout } from "./pages/UserLogout"
import CaptainProtectWrapper from "./pages/CaptainProtectWrapper"
import CaptainHome from "./pages/CaptainHome"

import CaptainLogout from "./pages/CaptainLogout"


function App() {
  

  return (
    <div>
      <Routes>
        <Route path='/' element={<Start/>} />
        <Route path='/login' element={<Userlogin/>} />
        <Route path='/signup' element={<Usersignup/>} />
        
        <Route path='/captain-login' element={<Captainlogin/>} />
        <Route path='/captain-signup' element={<Captainsignup/>} />

        <Route path='/home' element={
          <UserProtectWrapper>
          <Home/>
          </UserProtectWrapper>
          } />



          <Route path="/logout" element={
          <UserProtectWrapper>
          <UserLogout/>
          </UserProtectWrapper>}/>

          <Route path="/captain-home" element={
            <CaptainProtectWrapper>
              <CaptainHome/>
            </CaptainProtectWrapper>
          } />

          
          <Route path="/captain-logout" element={
          <UserProtectWrapper>
          <CaptainLogout/>
          </UserProtectWrapper>}/>

          


      </Routes>
     
    </div>
  )
}

export default App
