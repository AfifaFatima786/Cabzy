import React, { useState,useEffect } from 'react'
import {useGSAP}   from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import { IoIosArrowDown } from "react-icons/io";
import LocationSearchPanel from '../components/LocationSearchPanel';


function Home() {

  const[pickup,setPickup]=useState('')
  const [destination,setDestination]=useState('')
  const[panelOpen,setPanelOpen]=useState(false)

  const panelRef = useRef(null)
  const panelCloseRef=useRef(null);


  const submitHandler=(e)=>{
    e.preventDefault()
  }


  // Animate panel when panelOpen is true
  useEffect(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding:24,
        duration: 0.5,
        ease: 'power2.out',
      })
        gsap.to(panelCloseRef.current, {
          opacity:1
        })   
  }else{
    gsap.to(panelRef.current,{
      height:'0%',
      padding:0
    })
    gsap.to(panelCloseRef.current,{
      opacity:0

    })

  }
  }, [panelOpen])

  




  return (

    <div className="relative w-screen h-screen overflow-hidden">

      
  
  <img
    className="absolute top-5 left-5 w-20  "
    src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
    alt="Uber Logo"
  />
  <div className='h-screen w-screen'>
  <img
    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24ZBRpV4HJXIkRJsvQes6jbNvz1zOhySwWg&s"
    alt="Background"
    className="absolute top-0 left-0 w-full h-[100vh] object-cover z-0"
  /></div>

  <div className=' flex flex-col justify-end h-screen absolute top-0  w-full '>

    <div className='h-[30%] p-5 bg-white relative'>
      <h5 ref={panelCloseRef} onClick={()=>{
        setPanelOpen(false)
      }}  className='absolute top-6 opacity-0 right-4'>
        <IoIosArrowDown />
      </h5>
    <h4 className='text-2xl font-semibold'>Find a trip</h4>
    <form onClick={(e)=>{submitHandler(e)}} className='flex flex-col gap-2'>

      <div className='line absolute h-12 w-1 top-19 left-7.5  bg-gray-900 rouded-full'>
      </div>


      <input onClick={()=>{setPanelOpen(true)}} onChange={(e)=>setPickup(e.target.value)}  value={pickup} className='border px-6 py-1 rounded border-gray-400 bg-[#eee] mt-2' type="text" placeholder='Add a pick up location' />

      <input onClick={()=>{setPanelOpen(true)}} onChange={(e)=>setDestination(e.target.value)}  value={destination} className='border px-6  py-1 rounded border-gray-400 bg-[#eee] ' type="text" placeholder='Add a destination' />
    </form>
    </div>

    <div ref={panelRef}  className="h-0 bg-white p-1  ">
            <LocationSearchPanel/>
    </div>
  </div>


</div>



    
  )
}

export default Home
