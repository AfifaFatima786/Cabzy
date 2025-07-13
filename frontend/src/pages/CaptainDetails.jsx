import React, { useContext } from 'react';
import { IoIosTimer } from 'react-icons/io';
import { MdSpeed } from 'react-icons/md';
import { SlNotebook } from 'react-icons/sl';
import { CaptainDataContext } from '../context/CaptainContext';
import { MdFormatListNumbered } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { IoMdColorPalette } from "react-icons/io";

function CaptainDetails() {
  const { captain } = useContext(CaptainDataContext);

  return (
    <div className='flex flex-col gap-4'>
      {/* Profile Section */}
      <div className='flex items-center justify-between'>
        <div className='flex items-center justify-start gap-2'>
          <img
            className='rounded-full w-10 h-10 object-cover'
            src="https://imgs.search.brave.com/-Ay-agvNmH65Oi9ISI5AI9WxhKaTsF7kcsXrih-PvCg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9idXJz/dC5zaG9waWZ5Y2Ru/LmNvbS9waG90b3Mv/d29tYW4taG9sZGlu/Zy1oZXItZmFjZS1p/bi1ib3RoLWhlci1o/YW5kcy5qcGc_d2lk/dGg9MTAwMCZmb3Jt/YXQ9cGpwZyZleGlm/PTAmaXB0Yz0w"
            alt=""
          />
          <h4 className='text-lg font-medium capitalize'>
            {captain.fullName.firstName + ' ' + captain.fullName.lastName}
          </h4>
        </div>
      </div>

      {/* Vehicle Info Cards */}
      <div className='flex justify-center gap-6 px-2 py-3 bg-gray-100 rounded-xl items-start'>
        <div className='text-center w-28'>
          <div className='flex items-center justify-center '>
            
            <FaUserFriends size={25} />
          </div>
          <p className='text-s font-bold'>{captain.vehicle.capacity}</p>
          <h2 className='text-medium font-medium'>Vehicle Capacity</h2>
        </div>

        <div className='text-center w-28'>
          <div className='flex items-center justify-center mb-1'>
            
            <MdFormatListNumbered  size={25} />
          </div>
          <p className='text-s font-bold'>{captain.vehicle.plate}</p>
          <h2 className='text-medium font-medium'>Vehicle Number</h2>
        </div>

        <div className='text-center w-28'>
          <div className='flex items-center justify-center mb-1'>
            <IoMdColorPalette size={27} />
          </div>
          <p className='text-s font-bold'>{captain.vehicle.color}</p>
          <h2 className='text-medium font-medium'>Vehicle Color</h2>
        </div>
      </div>
    </div>
  );
}

export default CaptainDetails;
