import React from 'react'
import { useState, useEffect, useRef } from 'react'
import {Link,useLocation} from 'react-router-dom'

import { FiLogOut } from "react-icons/fi";
import { IoIosArrowUp } from "react-icons/io";
import gsap from 'gsap'
import FinishRide from '../components/FinishRide';
import LiveTracking from '../components/LiveTracking';

const CaptainRiding = () => {

  const [finishRidePanel, setFinishRidePanel] = useState(false)
  const finishRidePanelRef = useRef(null)
  const location=useLocation()
  const ride=location.state?.ride

  

  useEffect(() => {
    if(finishRidePanel){
    gsap.to(finishRidePanelRef.current,{
      transform:'translateY(0)'
    })}else{

      gsap.to(finishRidePanelRef.current,{
      transform:'translateY(100%)'
      })

    
  }}
  , [finishRidePanel])






  return (


    <div className='h-screen overflow-hidden '>



        <div className='fixed p-1 flex items-center justify-between w-full'>
          <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-logout' className='flex items-center justify-center rounded-full bg-gray-100 p-2 mt-1 '>
            <FiLogOut size={22} />
        </Link>
        </div>




        <div className='h-[80%]'>
            {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24ZBRpV4HJXIkRJsvQes6jbNvz1zOhySwWg&s"
                    alt="Background"
                className="  w-full h-full object-cover "
                    /> */}
                    <LiveTracking/>
        </div>


        <div onClick={()=>{setFinishRidePanel(true)}}
         className='bg-yellow-400 relative h-[20%]  gap-2 flex items-center justify-between px-3'>

          <h5 onClick={()=>{
                          // props.setRidePopupPanel(false)
                  
                          }} className='absolute w-full text-center  text-lg top-1 left-1/2 text-gray-900 '>
                              <IoIosArrowUp />
                              </h5>


                          
         <div className='flex w-full items-center justify-center'>
         <Link to='/captain-home' className=' bg-green-600 text-white font-semibold py-2 px-7 rounded-lg'>Complete Ride</Link>
         </div>

        </div>


        
  <div ref={finishRidePanelRef} 
  
       className='fixed  w-full translate-y-full  bg-white py-1 px-3 gap-2 flex flex-col  z-20 bottom-0'>

       <FinishRide 
       ride={ride}
       
       setFinishRidePanel={setFinishRidePanel}  />

  </div>

        
    </div>
  )
}

export default CaptainRiding
