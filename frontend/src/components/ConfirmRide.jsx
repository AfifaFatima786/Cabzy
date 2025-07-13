import React from 'react'
import { IoIosArrowDown } from "react-icons/io";
import { FaLocationDot } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { IoMdCash } from "react-icons/io";

function ConfirmRide(props) {

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
    <div>
      <h5 onClick={() => props.setConfirmRidePanel(false)}
        className='absolute w-full text-center translate-x-1/2 text-lg text-gray-200'>
        <IoIosArrowDown />
      </h5>

      <h3 className='text-2xl mt-1 font-semibold p-2'>Confirm your Ride</h3>

      <div className='flex flex-col gap-5 justify-between items-center'>
        {getVehicleImage() && (
          <img className='h-25' src={getVehicleImage()} alt="Vehicle" />
        )}

        <div className='w-full font-semibold flex flex-col gap-1.5 '>
          <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
            <FaLocationDot />
            <p>{props.pickup}</p>
          </div>
          <div className='flex gap-4 px-2 py-1 border-b-2 border-gray-200 items-center '>
            <SlLocationPin />
            <p>{props.destination}</p>
          </div>
          <div className='flex gap-4 px-2 py-1 items-center '>
            <IoMdCash />
            <p>{props.fare[props.vehicleType]}</p>
          </div>
        </div>

        <button
          onClick={() => {
            props.setVehicleFound(true);
            props.setConfirmRidePanel(false);
            props.createRide();
          }}
          className='w-full bg-green-600 text-white font-semibold p-2 rounded-lg'
        >
          Confirm
        </button>
      </div>
    </div>
  );
}

export default ConfirmRide;
