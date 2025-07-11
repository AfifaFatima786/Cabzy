import React from 'react'
import { Link } from 'react-router-dom'
import {useState,useEffect,useRef} from 'react'
import gsap from 'gsap'
import { FiLogOut } from "react-icons/fi";
import { useContext } from 'react';

import CaptainDetails from './CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import ConfirmRidePopup from '../components/ConfirmRidePopup';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';

function CaptainHome() {

  const [ridePopupPanel, setRidePopupPanel] = useState(true)
  const ridePopupPanelRef = useRef(null)
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false)
  const confirmRidePopupPanelRef = useRef(null)

  const {socket,sendMessage,receiveMessage}=useContext(SocketContext)
  const {captain}=useContext(CaptainDataContext)




  
    useEffect(()=>{
     
      console.log(captain._id)
      sendMessage("join",{ userType:"captain",userId:captain._id})
      console.log(socket.id)

      const updateLocation=()=>{
        if(navigator.geolocation){
          navigator.geolocation.getCurrentPosition(position=>{

            console.log({userId:captain._id,
              location:
              {ltd:position.coords.latitude,
              lng:position.coords.longitude}}
            )



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



    },[captain])



    socket.on('new-ride',(data)=>{
      
      console.log(data)
    })
  

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
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24ZBRpV4HJXIkRJsvQes6jbNvz1zOhySwWg&s"
                    alt="Background"
                className="  w-full h-full object-cover "
                    />
        </div>

      

        <div className='h-[30%] bottom-0 p-4 flex flex-col gap-5'>
         <CaptainDetails/> 
        </div>

        <div ref={ridePopupPanelRef}  
       className='fixed w-full translate-y-full bg-white py-1 px-3 gap-2 flex flex-col  z-20 bottom-0'>

       <RidePopUp setRidePopupPanel={setRidePopupPanel} setConfirmRidePopupPanel={setConfirmRidePopupPanel}/>

  </div>


  <div ref={confirmRidePopupPanelRef}  
       className='fixed  w-full translate-y-full  bg-white py-1 px-3 gap-2 flex flex-col  z-20 bottom-0'>

       <ConfirmRidePopup setConfirmRidePopupPanel={setConfirmRidePopupPanel} setRidePopupPanel={setRidePopupPanel} />

  </div>
        
    </div>
  )
}

export default CaptainHome
