import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

function LocationSearchPanel(props) {
    console.log(props)
    


    //sample array for locations
    const locations=["sarafarazganj hardoi road lucknow",
        "dubagggaa hardoi road lucknow",
        "hazratganj lucknow"
    ]
  return (
    <div className='flex flex-col gap-1'>

{
        locations.map(function(elem,idx){
            return <div key={idx} onClick={()=>{props.setVehiclePanel(true) 
                props.setPanelOpen(false)
            }} className='flex gap-2 border-2 border-gray-50 active:border-black  rounded-xl p-2 items-center'>
        <h2 className='bg-[#eee] h-10 w-14 flex items-center justify-center rounded-full'><FaLocationDot /></h2>
        <h4 className='font-medium'>{elem}</h4>
    </div>

        })}
    
    </div>
  )
}

export default LocationSearchPanel