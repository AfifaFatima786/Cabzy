import React from 'react'
import { FaLocationDot } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoMdCash } from "react-icons/io";
import { IoMdHome } from "react-icons/io";
import {Link,useLocation} from 'react-router-dom'
import { SocketContext } from '../context/SocketContext';
import {useContext,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import LiveTracking from './LiveTracking';

function Riding() {

    const location=useLocation()

    const {ride,value}=location.state|| {}
    const navigate=useNavigate()
    const {socket} = useContext(SocketContext)
    

    socket.on('ride-ended',()=>{
        navigate('/home')

    })

    
  const getVehicleImage = () => {
    if (value === 1) {
      return "https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png";
    } else if (value === 2) {
      return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_538,w_956/v1698944322/assets/92/00189a-71c0-4f6d-a9de-1b6a85239079/original/UberMoto-India-Orange.png";
    } else if (value === 3) {
      return "https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png";
    } else {
      return null;
    }
  };


  return (

    
    <div className='h-screen'>
        

        <Link to='/home' className='fixed flex items-center justify-center rounded-full bg-gray-200 p-2 top-1 right-1'>
            < IoMdHome size={22} />
        </Link>




        <div className='h-[45%]'>
           
                    <LiveTracking/>
        </div>

        <div className='h-[60%] flex flex-col gap-1'>

         <div className='flex items-center justify-between '>
            
              <img className='h-18 mt-4'  src={getVehicleImage()} alt="" />
              <div className='text-right p-5 mr-3'>
                <h2 className='font-medium  text-lg capitalize'>{ride?.captain.fullName.firstName}</h2>
                <h4 className='font-semibold text-xl'>{ride?.captain.vehicle.plate}</h4>
                
              </div>
        
              </div>
                
                       
                        <div className='w-full font-semibold flex flex-col gap-1 '>
                            <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
                                <FaLocationDot />
                                <div>
                                   
                                    <p>{ride?.pickup}</p>
                                </div>
                            </div>
                            
                
                                  <div className='flex gap-4 px-2 py-1  items-center '>
                                <IoMdCash />
                                <div>
                                    <h3>{ride?.fare}</h3>
                                    <p>Cash Cash</p>
                                </div>
                                </div>
                            
                
                
                
                        </div>


                       



            <Link to='/home'
             className='w-full text-center mt-4 bg-green-600 text-white font-semibold p-2 rounded-lg  '>Done</Link>
        </div>
    </div>
  )
}

export default Riding