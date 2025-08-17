import React,{useState,createContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import {UserDataContext} from '../context/UserContext'
import { toast } from 'react-toastify';
import logo from '../assets/logo.png';

function Usersignup() {

  const [ email, setEmail ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ firstName, setfirstName ] = useState('')
  const [ lastName, setlastName ] = useState('')
  const [ userData, setUserData ] = useState({})

  const navigate=useNavigate()

  const {user,setUser}=React.useContext(UserDataContext) /* to set the user maine context se phle sb manga liya then further i can do any changes to make it global */

  
  const submitHandler=async (e)=>{
    e.preventDefault()
    const newUser={
      fullName:{
        firstName:firstName,
        lastName:lastName,

      },
      email:email,
      password:password
    }


    console.log(newUser)
// yahan pr humne with credentials true kr diya hai vo nahi kiya tha pehle srf login mein he kiya tha isliye regsister route pr cookie set nahi ho rhi thi

    try{

    
    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/register`,newUser,{withCredentials:true})

    /*axios.post(url,newUser)   this is the syntax to send information from frontend to backend by giving exact url the info from here goes to that specific url in backend so that we can access info there*/

    if(response.status==201){
      const data=response.data

      setUser(data.user)  /* exactly yha p hm user ko set krrhe hai context variable me so that it is accessible to any other components */

      localStorage.setItem('token',data.token)
      navigate('/home')


    }


    

    setEmail('')
    setPassword('')

    setfirstName('')
    setlastName('')}
    catch(error){
      if (error.response) {
    const data = error.response.data;

    
    const msg =
      data?.errors?.[0]?.msg ||   
      data?.message ||            
      data?.error?.msg ||         
      "Something went wrong!";    

    toast.error(msg);
    console.error("Validation error:", msg);
    }
  }}




 return (
    <div>
      <div className='p-7 h-screen flex flex-col justify-between'>
        <div>
          <img className='w-25 ' src={logo} alt="" />

          <form onSubmit={(e) => {
            submitHandler(e)
          }}>

            <h3 className='text-lg w-1/2  font-medium mb-2'>What's your name</h3>
            <div className='flex gap-4 mb-7'>
              <input
                required
                className='bg-[#eeeeee] w-1/2 rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='First name'
                value={firstName}
                onChange={(e) => {
                  setfirstName(e.target.value)
                }}
              />
              <input
                required
                className='bg-[#eeeeee] w-1/2  rounded-lg px-4 py-2 border  text-lg placeholder:text-base'
                type="text"
                placeholder='Last name'
                value={lastName}
                onChange={(e) => {
                  setlastName(e.target.value)
                }}
              />
            </div>

            <h3 className='text-lg font-medium mb-2'>What's your email</h3>
            <input
              required
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
              }}
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              type="email"
              placeholder='email@example.com'
            />

            <h3 className='text-lg font-medium mb-2'>Enter Password</h3>

            <input
              className='bg-[#eeeeee] mb-7 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value)
              }}
              required type="password"
              placeholder='password'
            />

            <button
              className='bg-[#111] text-white cursor-pointer font-semibold mb-3 rounded-lg px-4 py-2 w-full text-lg placeholder:text-base'
            >Create account</button>

          </form>
          <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
        </div>

        <div>
          <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy
            Policy</span> and <span className='underline'>Terms of Service apply</span>.</p>
        </div>
        
      </div>
    </div >
  )
}

export default Usersignup