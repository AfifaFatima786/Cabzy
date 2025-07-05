import React from 'react'
import { FaLocationDot } from "react-icons/fa6";

function LocationSearchPanel({ suggestions, setVehiclePanel, setPanelOpen, setPickup, setDestination, activeField }) {
    
    const handleSuggestionClick = (suggestion) => {
        console.log("Fucntion call ho tha hai babu ki nahi")
        if (activeField === 'pickup') {
            
            setPickup(suggestion.description)
        } else if (activeField === 'destination') {
            setDestination(suggestion.description)
        }
        
       
    }






  return (
    <div className='flex  flex-col gap-1 mt-7'>

{
        suggestions.map(function(elem,idx){
            return <div key={idx} 
            onClick={() => {
                console.log("handle click to work krega bna",elem);
                return handleSuggestionClick(elem)
            }}
            
            className='flex gap-2 border-2  border-gray-50 active:border-black  rounded-xl p-2 items-center'>
    {console.log("bhayes hum to location hai humein click kr rhe ho aap")}
        <h2 className='bg-[#eee] h-10 w-[20%]  flex items-center justify-center rounded-full'><FaLocationDot /></h2>
        <h4 className='font-medium w-[80%]'>{elem.description}</h4>
    </div>

        })}
    
    </div>
  )
}

export default LocationSearchPanel