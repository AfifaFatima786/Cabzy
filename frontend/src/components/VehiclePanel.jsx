import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaUser } from "react-icons/fa";

const VehiclePanel = (props) => {
  return (
    <div>
        <h5 onClick={()=>{
                props.setVehiclePanelOpen(false)
              }} className='absolute w-full text-center  translate-x-1/2 text-lg text-gray-200 '>
                    < IoIosArrowDown />
                </h5>
        
            <h3 className='text-2xl mt-2 font-semibold p-2'>Choose a Vehicle</h3>
            
        
            <div className='flex border-2 p-2 border-gray-200 active:border-black rounded-xl w-full items-center gap-2   justify-between '>
              <img className='h-10' src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
              <div className=' '>
                <h4 className='flex gap-1 font-medium text-md'>UberGo <span className='flex items-center justify-center'><FaUser /></span>4</h4>
                <h5 className='flex font-medium text-sm'>2 mins aways</h5>
                <p className='flex font-medium text-xs text-gray-600'>Afforadable ,compact rides</p>
                
              </div>
              <h2 className='text-lg font-semibold'>₹193.20</h2>
            </div>
        
            
            <div className='flex border-2 p-2 border-gray-300 active:border-black rounded-xl w-full items-center gap-2   justify-between '>
              <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png" alt="" />
              <div className=' '>
                <h4 className='flex gap-1 font-medium text-md'>Moto <span className='flex items-center justify-center'><FaUser /></span>1</h4>
                <h5 className='flex font-medium text-sm'>3 mins aways</h5>
                <p className='flex font-medium text-xs text-gray-600'>Afforadable motorcycle rides</p>
                
              </div>
              <h2 className='text-lg font-semibold'>₹65</h2>
            </div>
        
              
            <div className='flex border-2 p-2 border-gray-200 active:border-black rounded-xl w-full items-center gap-2   justify-between '>
              <img className='h-10' src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png" alt="" />
              <div className=' '>
                <h4 className='flex gap-1 font-medium text-md'>Moto <span className='flex items-center justify-center'><FaUser /></span>3</h4>
                <h5 className='flex font-medium text-sm'>3 mins aways</h5>
                <p className='flex font-medium text-xs text-gray-600'>Afforadable Auto rides</p>
                
              </div>
              <h2 className='text-lg font-semibold'>₹118.68</h2>
            </div>
        
        
        
        
          
    </div>
  )
}

export default VehiclePanel