import React from 'react'
import { Link } from 'react-router-dom'
import {useState,useEffect,useRef} from 'react'
import gsap from 'gsap'
import { FiLogOut } from "react-icons/fi";
import { useContext } from 'react';
import axios from 'axios';

import CaptainDetails from './CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopup from '../components/ConfirmRidePopup';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import LiveTracking from '../components/LiveTracking';

function CaptainHome() {

  const [ridePopupPanel, setRidePopupPanel] = useState(false)
  const ridePopupPanelRef = useRef(null)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const confirmRidePopupPanelRef = useRef(null)

  const {socket,sendMessage}=useContext(SocketContext)
  const {captain}=useContext(CaptainDataContext)
  const [ride, setRide] = useState(null)




  
    useEffect(()=>{
     
      sendMessage("join",{ userType:"captain",userId:captain._id})
      

      const updateLocation=()=>{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position=>{



            socket.emit('update-location-captain',{
              userId:captain._id,
              // location:
              // {ltd:position.coords.latitude,
              // lng:position.coords.longitude}


              location: {
    type: 'Point',
    coordinates: [position.coords.longitude, position.coords.latitude]
  }
            })
          })
        }
      }

      const locationInterval=setInterval(updateLocation,10000)
      updateLocation()

      // ✅ FIXED: Move socket listener inside useEffect
      const handleNewRide = (data) => {
        console.log('🎯 New ride received:', data);
        setRide(data)
        setRidePopupPanel(true)
      }

      socket.on('new-ride', handleNewRide)

      // ✅ ADDED: Cleanup function
      return () => {
        clearInterval(locationInterval)
        socket.off('new-ride', handleNewRide)
      }

    },[captain, socket])


    async function confirmRide(){
      console.log("idhr call aa rhi hai ")
      const check = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {rideId: ride._id,captainId: captain._id},
  {
    withCredentials: true
  }

)
console.log(check,"Confoirm ride functione")

      
      setRidePopupPanel(false)
      setConfirmRidePopupPanel(true)
    }
  

  useEffect(() => {
    if(ridePopupPanel){
    gsap.to(ridePopupPanelRef.current,{
      transform:'translateY(0)'
    })}else{

      gsap.to(ridePopupPanelRef.current,{
      transform:'translateY(100%)'
      })

    
  }}
  , [ridePopupPanel])


  

  useEffect(() => {
    if(confirmRidePopupPanel){
    gsap.to(confirmRidePopupPanelRef.current,{
      transform:'translateY(0)'
    })}else{

      gsap.to(confirmRidePopupPanelRef.current,{
      transform:'translateY(100%)'
      })

    
  }}
  , [confirmRidePopupPanel])




  return (
     <div className='h-screen'>

        <div className='fixed p-1 flex items-center justify-between w-full'>
          <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <Link to='/captain-logout' className='flex items-center justify-center rounded-full bg-gray-100 p-2 mt-1 '>
            <FiLogOut size={22} />
        </Link>
        </div>




        <div className='h-[60%]'>
            {/* <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24ZBRpV4HJXIkRJsvQes6jbNvz1zOhySwWg&s"
                    alt="Background"
                className="  w-full h-full object-cover "
                    /> */}
                    <LiveTracking/>
        </div>

      

        <div className='h-[30%] bottom-0 p-4 flex flex-col gap-5'>
         <CaptainDetails/> 
        </div>
        

 
         <div ref={ridePopupPanelRef}  
       className='fixed w-full translate-y-full bg-white py-1 px-3 gap-2 flex flex-col  z-20 bottom-0'>

       {ride && (<RidePopUp setRidePopupPanel={setRidePopupPanel} 
       
       ride={ride}
       setConfirmRidePopupPanel={setConfirmRidePopupPanel}
       confirmRide={confirmRide}
       
       />
       )}

  </div> 


  <div ref={confirmRidePopupPanelRef}  
       className='fixed  w-full translate-y-full  bg-white py-1 px-3 gap-2 flex flex-col  z-20 bottom-0'>

       <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel}
       ride={ride}
        setRidePopupPanel={setRidePopupPanel} />

  </div>
        
    </div>
  )
}

export default CaptainHome
