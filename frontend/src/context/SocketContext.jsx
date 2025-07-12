import React, { createContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

export const SocketContext = createContext();

const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
  withCredentials: true,
  transports: ['websocket', 'polling']

});

const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    const onConnect = () => {
      console.log('connected from server');
      setIsConnected(true);
    };
    const onDisconnect = () => {
      console.log('disconnected from server');
      setIsConnected(false);
    };

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

  const sendMessage = (eventName, message) => {
    console.log(`sending message: ${message} to ${eventName}`);
    socket.emit(eventName, message);
  };

  const receiveMessage = (eventName, callback) => {
    socket.off(eventName); // ensure no duplicate listeners
    socket.on(eventName, callback);
  };

  return (
    <SocketContext.Provider value={{ socket, sendMessage, receiveMessage, isConnected }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
