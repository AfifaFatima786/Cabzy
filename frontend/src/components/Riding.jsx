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

    const {ride}=location.state|| {}
    const navigate=useNavigate()
    const {socket} = useContext(SocketContext)

    socket.on('ride-ended',()=>{
        navigate('/home')

    })


  return (
    <div className='h-screen'>

        <Link to='/home' className='fixed flex items-center justify-center rounded-full bg-gray-200 p-2 top-1 right-1'>
            < IoMdHome size={22} />
        </Link>




        <div className='h-[40%]'>
            {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24ZBRpV4HJXIkRJsvQes6jbNvz1zOhySwWg&s"
                    alt="Background"
                className="  w-full h-full object-cover "
                    /> */}
                    <LiveTracking/>
        </div>

        <div className='h-[60%] flex flex-col gap-1'>

         <div className='flex items-center justify-between '>
              <img className='h-15'  src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png" alt="" />
              <div className='text-right p-4'>
                <h2 className='font-medium text-lg capitalize'>{ride?.captain.fullName.firstName}</h2>
                <h4 className='font-semibold text-xl'>{ride?.captain.vehicle.plate}</h4>
                <p className='text-sm text-gray-600'>Maruti Suzuki Alto</p>
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
             className='w-full text-center mt-4 bg-green-600 text-white font-semibold p-2 rounded-lg  '>Payment done</Link>
        </div>
    </div>
  )
}

export default Riding