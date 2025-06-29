import React,{useState,useContext} from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { CaptainDataContext } from '../context/CaptainContext';

function CaptainLogin() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {setCaptain} =useContext(CaptainDataContext)
  
  const navigate=useNavigate()


  const submitHandler=async (e)=>{
    e.preventDefault()

    const captain={
      email:email,
      password:password
    }
    console.log(captain)

    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/captain/login`, captain,{
      withCredentials:true
  
    })

    

    if (response.status === 200) {
      const data = response.data
      setCaptain(data.captain)  /*backend me successfully register hogya uske baad hi hm frontend k context me update yaani setCaptain krege*/
      
      localStorage.setItem('token', data.token)
      
      
      
      navigate('/captain-home')
    }

    setEmail('')
    setPassword('')
  }

  return (
    <div className='p-5 h-screen flex flex-col gap-3 justify-between'>


      <div className='flex flex-col '>
 <img className='w-20' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
      
      <form onSubmit={(e)=>{submitHandler(e)} }className="flex flex-col gap-2.5" action="">
        <h3 className='font-bold text-lg'>What's your email</h3>
        <input value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} type="text" placeholder='email@example.com' required className='bg-[#eeeeee]  rounded px-4 py-1.5 border w-full text-lg placeholder:text-sm' />

        <h3 className='font-bold text-lg'>Enter Password</h3>

        <input type="password" value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder='password' required className='bg-[#eeeeee] rounded px-4 py-1.5 border w-full text-lg placeholder:text-sm'/>


        <button className='bg-[#111] mt-5 cursor-pointer text-white rounded px-4 py-1.5 border w-full text-lg placeholder:text-sm'>Login</button>


        <p className='text-center'>Join a fleet? <Link to='/captain-signup' className='text-blue-800'>Register as a Captain</Link></p>
      </form>
      </div>


      <div className='w-full'>
        <Link to={'/signup'} className='flex items-center justify-center bg-[#d5622d] text-white rounded px-4 py-1.5 border w-[100%] text-lg placeholder:text-sm'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptainLogin