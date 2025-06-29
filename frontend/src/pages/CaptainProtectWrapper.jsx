import React, { use, useEffect, useState,useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {CaptainDataContext} from '../context/CaptainContext'


const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const {captain,setCaptain}=useContext(CaptainDataContext)

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      navigate('/captain-login');
    } 
  }, [navigate]);

  

  return <>{children}</>;
};

export default CaptainProtectWrapper;
