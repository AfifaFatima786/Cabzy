import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoMdCash } from "react-icons/io";

function WaitingForDriver(props) {

  
  const getVehicleImage = () => {
    if (props.value === 1) {
      return "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png";
    } else if (props.value === 2) {
      return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png";
    } else if (props.value === 3) {
      return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png";
    } else {
      return null;
    }
  };
  return (
    <div className='h-80'>
      <h5  className='absolute w-full text-center  translate-x-1/2 text-lg text-gray-200'
       onClick={()=>{props.setWaitingForDriver(false)
        props.setVehicleFound(false)
       }}
       >
                            < IoIosArrowDown />
                            </h5>

    <div className='flex items-center justify-between '>
      <img className='h-17'  src={getVehicleImage()} alt="" />
      <div className='text-right p-4 py-6'>
        <h2 className='font-medium text-lg capitalize'>
          {props.ride?.captain.fullName.firstName+" "+props.ride?.captain.fullName.lastName}
          
          </h2>
        <h4 className='font-semibold text-xl'>{props.ride?.captain.vehicle.plate} </h4>
        
        
        <h1 className='text-sm text-gray-900'>{props.ride?.otp}</h1>
      </div>

      </div>
        
               
                <div className='w-full font-semibold flex flex-col gap-1.5 '>
                    <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
                        <FaLocationDot />
                        <div>
                             
                            {props.ride?.pickup}
                        </div>
                    </div>
                    <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
                        <SlLocationPin />
                        <div>
                         
                          {props.ride?.destination}
                            

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