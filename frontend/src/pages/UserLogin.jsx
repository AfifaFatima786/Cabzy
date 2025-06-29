import React,{useState} from 'react'
import { Link } from 'react-router-dom'
import {UserDataContext} from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function UserLogin() {

  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [userData,setUserData]=useState({})

  const navigate=useNavigate()

   const {user,setUser}=React.useContext(UserDataContext)


  const submitHandler=async (e)=>{
    e.preventDefault()

    const userData={
      email:email,
      password:password

    }

    const response=await axios.post(`${import.meta.env.VITE_BASE_URL}/users/login`,userData,{withCredentials:true})


    if(response.status==200){
      const data=response.data
      setUser(data.user)

      console.log(data.token)

    // const  localstoragetoken = data.token
      
      localStorage.setItem('token',data.token)
      navigate('/home')

    }
    

    setEmail('')
    setPassword('')
  }




  return (
    <div className='p-7 h-screen flex flex-col gap-3 justify-between'>
      <div className='flex flex-col gap-8'>

      <img className='w-18' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
      <form onSubmit={(e)=>{submitHandler(e)} }className="flex flex-col gap-2.5" action="">
        <h3 className='font-bold text-lg'>What's your email</h3>
        <input value={email} onChange={(e)=>{
          setEmail(e.target.value)
        }} type="text" placeholder='email@example.com' required className='bg-[#eeeeee]  rounded px-4 py-1.5 border w-full text-lg placeholder:text-sm' />

        <h3 className='font-bold text-lg'>Enter Password</h3>

        <input type="password" value={password} onChange={(e)=>{
          setPassword(e.target.value)
        }} placeholder='password' required className='bg-[#eeeeee] rounded px-4 py-1.5 border w-full text-lg placeholder:text-sm'/>


        <button  className='bg-[#111] mt-5 text-white rounded px-4 py-1.5 border w-full text-lg cursor-pointer placeholder:text-sm'>Login</button>


        <p className='text-center'>New User? <Link to='/signup' className='text-blue-800'>Create new Account</Link></p>
      </form>
      </div>


      <div className='w-full'>
        <Link to={'/captain-login'} className='flex items-center justify-center bg-[#10b461] text-white rounded px-4 py-1.5 border w-[100%] text-lg placeholder:text-sm'>Login in as Captain</Link>
      </div>
    </div>
  )
}

export default UserLogin