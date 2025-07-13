import React, { useState, useEffect, useRef } from 'react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const LiveTracking = () => {
  const [currentPosition, setCurrentPosition] = useState(null);
  const mapRef = useRef(null); // prevent re-centering every render

  useEffect(() => {
    let watchId;

    const updatePosition = (position) => {
      const { latitude, longitude } = position.coords;
      const newPosition = { lat: latitude, lng: longitude };
      setCurrentPosition(newPosition);

      if (mapRef.current) {
        mapRef.current.panTo(newPosition);
      }

      console.log('📍 Updated Position:', newPosition);
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updatePosition);
      watchId = navigator.geolocation.watchPosition(updatePosition);
    }

    return () => {
      if (watchId) navigator.geolocation.clearWatch(watchId);
    };
  }, []);

  return (
    <LoadScript googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}>
      {currentPosition && (
        <GoogleMap
          mapContainerStyle={containerStyle}
          center={currentPosition}
          zoom={15}
          onLoad={(map) => {
            mapRef.current = map;
          }}
        >
          <Marker position={currentPosition} />
        </GoogleMap>
      )}
    </LoadScript>
  );
};

export default LiveTracking;
