import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoMdCash } from "react-icons/io";

function WaitingForDriver(props) {
  return (
    <div>
      <h5  className='absolute w-full text-center  translate-x-1/2 text-lg text-gray-200 '
       onClick={()=>{props.setWaitingForDriver(false)
        props.setVehicleFound(false)
       }}
       >
                            < IoIosArrowDown />
                            </h5>

    <div className='flex items-center justify-between '>
      <img className='h-15'  src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
      <div className='text-right p-4'>
        <h2 className='font-medium text-lg capitalize'>
          {props.ride?.captain.fullName.firstName+" "+props.ride?.captain.fullName.lastName}
          
          </h2>
        <h4 className='font-semibold text-xl'>{props.ride?.captain.vehicle.plate} </h4>
        <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
        <h1 className='text-sm text-gray-900'>{props.ride?.otp}</h1>
      </div>

      </div>
        
               
                <div className='w-full font-semibold flex flex-col gap-1.5 '>
                    <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
                        <FaLocationDot />
                        <div>
                             <h3>546/415</h3>
                            {/* <p>Sarfarazganj Lucknow</p> */}
                            {props.ride?.pickup}
                        </div>
                    </div>
                    <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
                        <SlLocationPin />
                        <div>
                          <h3>546/415</h3>
                          {props.ride?.destination}
                            {/* <h3>546/415</h3>
                            <p>Sarfarazganj Lucknow</p> */}

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
               
            </div>
          
  )
}

export default WaitingForDriver