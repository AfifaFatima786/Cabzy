import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoMdCash } from "react-icons/io";

function LookingForDriver(props) {
  return (
    <div>
             <h5 onClick={()=>{props.setVehicleFound(false)}}  className='absolute w-full text-center  translate-x-1/2 text-lg text-gray-200 '>
                        < IoIosArrowDown />
                        </h5>
    
            <h3 className='text-2xl mt-1 font-semibold p-2'>Looking for a Driver</h3>
                    <div className='flex flex-col gap-5 justify-between items-center'>
            <img className='h-25'  src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
    
            <div className='w-full font-semibold flex flex-col gap-1.5 '>
                <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
                    <FaLocationDot />
                    <div>
                        {props.pickup}
                        
                    </div>
                </div>
                <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
                    <SlLocationPin />
                    <div>
                        <p>{props.destination}</p>
                        
                    </div>
                    </div>
    
                      <div className='flex gap-4 px-2 py-1  items-center '>
                    <IoMdCash />
                    <div>
                     
                       <p>{props.fare[props.vehicleType]}</p>
                    </div>
                    </div>
                
    
    
    
            </div>
           
        </div>
        </div>
  )
}

export default LookingForDriver