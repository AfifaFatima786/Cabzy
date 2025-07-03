import React from 'react'
import {  IoMdCash } from 'react-icons/io'
import { FaLocationDot } from "react-icons/fa6";
import { FiLogOut } from "react-icons/fi";
import { IoIosTimer } from "react-icons/io";
import { MdSpeed } from "react-icons/md";
import { SlNotebook } from "react-icons/sl";

function CaptainDetails() {
  return (
    <div className='flex flex-col gap-4'>
         <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-2' >
        
        <img  className='rounded-full w-10 h-10  object-cover ' src="https://imgs.search.brave.com/-Ay-agvNmH65Oi9ISI5AI9WxhKaTsF7kcsXrih-PvCg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/d29tYW4taG9sZGlu/Zy1oZXItZmFjZS1p/bi1ib3RoLWhlci1o/YW5kcy5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w" alt="" />
        <h4 className='text-lg font-medium'>Harsh Patel</h4>
        
        </div>

        <div>
          <h4 className='text-xl font-bold'>295.20</h4>
          <p className='text-sm font-medium '>Earned</p>
        </div>
        </div>

              
        <div className='flex justify-center gap-4 p-3 bg-gray-100 rounded-xl items-start'>
          <div className='text-center'>
            <div className='flex items-center justify-center'>
            <IoIosTimer size={22}  /> </div>
            <h2 className='text-lg font-medium'>10.2</h2>
            <p className='text-sm '>Hours Online</p>
          </div>
          <div className='text-center'>
            <div  className='flex items-center justify-center'>
            <MdSpeed size={22}/></div>
            <h2 className='text-lg font-medium'>10.2</h2>
            <p className='text-sm '>Hours Online</p>
          </div>
          <div className='text-center'>
            <div  className='flex items-center justify-center'>
            <SlNotebook size={22} /></div>
            <h2 className='text-lg font-medium'>10.2</h2>
            <p className='text-sm text-gray-600'>Hours Online</p>
          </div>
          </div> 
    </div>
  )
}

export default CaptainDetails