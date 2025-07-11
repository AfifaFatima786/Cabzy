import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoMdCash } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import {Link} from 'react-router-dom'

function Riding() {
  return (
    <div className='h-screen'>

        <Link to='/home' className='fixed flex items-center justify-center rounded-full bg-gray-200 p-2 top-1 right-1'>
            < IoMdHome size={22} />
        </Link>




        <div className='h-[45%]'>
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24ZBRpV4HJXIkRJsvQes6jbNvz1zOhySwWg&s"
                    alt="Background"
                className="  w-full h-full object-cover "
                    />
        </div>

        <div className='h-1/2 flex flex-col gap-1.5'>

         <div className='flex items-center justify-between '>
              <img className='h-15'  src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
              <div className='text-right p-4'>
                <h2 className='font-medium text-lg'>Sarthak</h2>
                <h4 className='font-semibold text-xl'>MP04 AB 1234</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
              </div>
        
              </div>
                
                       
                        <div className='w-full font-semibold flex flex-col gap-1.5 '>
                            <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
                                <FaLocationDot />
                                <div>
                                    <h3>546/415</h3>
                                    <p>Sarfarazganj Lucknow</p>
                                </div>
                            </div>
                            
                
                                  <div className='flex gap-4 px-2 py-1  items-center '>
                                <IoMdCash />
                                <div>
                                    <h3>193.20</h3>
                                    <p>Cash Cash</p>
                                </div>
                                </div>
                            
                
                
                
                        </div>
            <button className='w-full bg-green-600 mt-2 text-white font-semibold p-2 rounded-lg  '>Make a Payment</button>
        </div>
    </div>
  )
}

export default Riding