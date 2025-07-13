import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoMdCash } from "react-icons/io";
import { Link } from 'react-router-dom';

function FinishRide(props) {
  return (
   <div className='flex py-2  flex-col gap-2 '>
              <h5 onClick={()=>{
               props.setFinishRidePanel(false)
                          
                  
                          }} className='absolute  w-full text-center  translate-x-1/2 text-lg text-gray-200 '>
                              < IoIosArrowDown />
                              </h5>
          
                  <h3 className='text-2xl mt-6 font-bold p-2'>Finish this Ride</h3>
      
                  <div className='flex items-ceqnter bg-yellow-300 p-2.5 rounded-lg justify-between'>
                      <div className='flex items-center gap-2'>
                          <img className='w-12 h-12 rounded-full object-cover' src="https://imgs.search.brave.com/u7M5CM4eAG9QRh6M0JUHNtJR5b8fWQM1hxWDOngadNs/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/d29tYW4taG9sZGlu/Zy1oZXItZmFjZS1p/bi1ib3RoLWhlci1o/YW5kcy5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w" alt="" />
      
                          <h2 className='text-xl font-medium'>{props.ride?.user.fullname.firstname}</h2>
                      </div>
                      <h5 className='text-lg font-semibold'>2.2 km</h5>
                  </div>
      
      
      
      
                          <div className='flex flex-col gap-3 justify-between items-center'>
                  
                  <div className='w-full font-semibold flex flex-col gap-1.5 '>
                      <div className='flex gap-4 px-2  border-b-2 border-gray-200 items-center '>
                          <FaLocationDot />
                          <div>
                              <h3>546/415</h3>
                              <p>{props.ride?.pickup}</p>
                          </div>
                      </div>
                      <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
                          <SlLocationPin />
                          <div>
                              <h3>546/415</h3>
                              <p>{props.ride?.destination}</p>
                          </div>
                          </div>
          
                            <div className='flex gap-4 px-2 py-1  items-center '>
                          <IoMdCash />
                          <div>
                              <h3>{props.ride?.fare}</h3>
                              <p>Cash Cash</p>
                          </div>
                          </div>
                      
          
          
          
                  </div>
                  
   
   
                  <div className='w-full flex' >
                   
   
         <Link
           to='/captain-home'
           className='bg-green-600 text-white mt-5 font-semibold py-2 px-6 rounded-lg w-full text-center'
         >
           Finish Ride
         </Link> </div>
         {/* <div>

         <p className='text-red-500 text-xs mt-2 '>Click on finish ride button if you have completed the payment</p>
        
       </div> */}
     
   
      
      
              </div>
              </div>
  )
}

export default FinishRide