import React from 'react'
import {Link} from 'react-router-dom'
import logo from '../assets/logo.png'

function Start() {
  return (
    <div>
        <div className='bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1557404763-69708cd8b9ce?q=80&w=764&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen px-6  w-full flex flex-col justify-between '>
            <img className='w-30' src={logo} alt="" />
            <div className='bg-white py-5 px-3 flex flex-col gap-4.5 rounded mb-5'>
                <h2 className='text-2xl  font-bold'>Get Started with CABZY</h2>
                <Link to='/login' className='bg-black w-full text-white p-3 rounded-md flex item-center justify-center'>Continue</Link>

            </div>

        </div>
    </div>
  )
}

export default Start