
import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { captain, setCaptain } = useContext(CaptainDataContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/captain-login');
      return;
    }

    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/profile`, {
      withCredentials: true
    })
      .then(response => {
        console.log("Full response:", response);

        const captain = response.data?.captain || response.data;

        if (response.status === 200 && captain) {
          console.log("chlgya")
          setCaptain(captain);
          setIsLoading(false);
        } else {
          localStorage.removeItem('token');
          navigate('/captain-login');
        }
      })
      .catch(err => {
        console.error("Profile fetch error:", err);
        localStorage.removeItem('token');
        navigate('/captain-login');
      });
  }, [navigate, setCaptain]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default CaptainProtectWrapper;
