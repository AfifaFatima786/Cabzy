import React, { useState, useEffect, useRef } from 'react';
import { IoIosArrowDown } from "react-icons/io";
import LocationSearchPanel from '../components/LocationSearchPanel';
import VehiclePanel from '../components/VehiclePanel';
import ConfirmRide from '../components/ConfirmRide';
import LookingForDriver from '../components/LookingForDriver';
import WaitingForDriver from '../components/WaitingForDriver';
import axios from 'axios';
import { SocketContext } from '../context/SocketContext';
import { useContext } from 'react';
import { UserDataContext } from '../context/UserContext';


function Home() {
  const [pickup, setPickup] = useState('');
  const [destination, setDestination] = useState('');
  const [panelOpen, setPanelOpen] = useState(false);
  const panelRef = useRef(null);
  const panelCloseRef = useRef(null);

  const [vehiclePanelOpen, setVehiclePanelOpen] = useState(false);
  const [ConfirmRidePanel, setConfirmRidePanel] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [waitingForDriver, setwaitingForDriver] = useState(false);

  const [activeField, setActiveField] = useState(null);
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [fare, setFare] = useState({});
  const [vehicleType, setVehicleType] = useState(null);
  const {sendMessage,receiveMessage}=useContext(SocketContext)
  const {user}=useContext(UserDataContext)



  useEffect(()=>{
    console.log(user+"ye user h")
    console.log(user._id)
    sendMessage("join",{ userType:"user",userId:user._id})
  },[user])




  const handlePickupChange = async (e) => {
    setPickup(e.target.value);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        { input: e.target.value },
        { withCredentials: true }
      );
      setPickupSuggestions(response.data);
    } catch (err) {
      console.error("Pickup suggestion error:", err.response?.data || err.message);
    }
  };

  const handleDestinationChange = async (e) => {
    setDestination(e.target.value);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`,
        { input: e.target.value },
        { withCredentials: true }
      );
      setDestinationSuggestions(response.data);
    } catch (err) {
      console.error("Destination suggestion error:", err.response?.data || err.message);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
  };

  async function findTrip() {
    console.log("bhaiya click ho rha hai")
    setPanelOpen(false);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      withCredentials: true
    });
    setFare(response.data);
    setVehiclePanelOpen(true);
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      withCredentials: true
    });
    console.log(response.data);
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        className="absolute top-5 left-5 w-20"
        src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
        alt="Uber Logo"
      />
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS24ZBRpV4HJXIkRJsvQes6jbNvz1zOhySwWg&s"
        alt="Background"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      />

      <div className="flex flex-col justify-end h-screen absolute top-0 w-full">
        <div className="h-[30%] p-5 bg-white relative z-10">
          <h5 ref={panelCloseRef} onClick={() => setPanelOpen(false)} className="absolute top-6 right-4 opacity-100 cursor-pointer">
            <IoIosArrowDown />
          </h5>
          <h4 className="text-2xl font-semibold">Find a trip</h4>
          <form onClick={submitHandler} className="flex flex-col gap-2">
            <div className="line absolute h-12 w-1 top-19 left-7.5 bg-gray-900 rounded-full" />
            <input
              onClick={() => { setPanelOpen(true); setActiveField('pickup'); }}
              onChange={handlePickupChange}
              value={pickup}
              className="border px-6 py-1 rounded border-gray-400 bg-[#eee] mt-2"
              type="text"
              placeholder="Add a pick up location"
            />
            <input
              onClick={() => { setPanelOpen(true); setActiveField('destination'); }}
              onChange={handleDestinationChange}
              value={destination}
              className="border px-6 py-1 rounded border-gray-400 bg-[#eee]"
              type="text"
              placeholder="Add a destination"
            />
          </form>
          
        </div>

        {/* Location Search Panel */}
        <div
          ref={panelRef}
          className={`bg-white p-5 transition-all duration-300 overflow-hidden ${
            panelOpen ? 'h-[70%]' : 'h-0 p-0'
          } z-20`}
        >
          <button
            onClick={findTrip}
            className="bg-black text-white px-3 py-2 rounded  relative z-100 w-full"
          >
            Find Trip
          </button>
          <LocationSearchPanel
            setVehiclePanel={setVehiclePanelOpen}
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanelOpen={setVehiclePanelOpen}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
          
        </div>
      </div>

      {/* Panels */}
      {/* Vehicle Panel */}
      <div className={`fixed w-full bg-white py-1 px-3 gap-2 flex flex-col bottom-0 transition-transform duration-500 ${
        vehiclePanelOpen ? 'translate-y-0 z-30' : 'translate-y-full z-0'
      }`}>
        <VehiclePanel
          fare={fare}
          setVehicleType={setVehicleType}
          setVehiclePanelOpen={setVehiclePanelOpen}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      {/* Confirm Ride Panel */}
      <div className={`fixed w-full bg-white py-1 px-3 gap-2 flex flex-col bottom-0 transition-transform duration-500 ${
        ConfirmRidePanel ? 'translate-y-0 z-40' : 'translate-y-full z-0'
      }`}>
        <ConfirmRide
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Looking for Driver Panel */}
      <div className={`fixed w-full bg-white py-1 px-3 gap-2 flex flex-col bottom-0 transition-transform duration-500 ${
        vehicleFound ? 'translate-y-0 z-50' : 'translate-y-full z-0'
      }`}>
        <LookingForDriver
          setVehicleFound={setVehicleFound}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          createRide={createRide}
          setConfirmRidePanel={setConfirmRidePanel}
        />
      </div>

      {/* Waiting for Driver Panel */}
      <div className={`fixed w-full bg-white py-1 px-3 gap-2 flex flex-col bottom-0 transition-transform duration-500 ${
        waitingForDriver ? 'translate-y-0 z-60' : 'translate-y-full z-0'
      }`}>
        <WaitingForDriver waitingForDriver={waitingForDriver} />
      </div>
    </div>
  );
}

export default Home;
