

import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useContext(UserDataContext);
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(' UserProtectWrapper - Token:', token);
    console.log(' UserProtectWrapper - Current user context:', user);
    
    if (!token) {
      console.log(' No token found, redirecting to login');
      navigate('/login');
      return;
    }

    // If user context is empty, fetch user data from backend
    if (!user || !user._id) {
      console.log('🔄 User context empty, fetching from backend...');
      axios.get(`${import.meta.env.VITE_BASE_URL}/users/profile`, {
        withCredentials: true
      })
        .then(response => {
          console.log("User profile response:", response.data);
          setUser(response.data);
          setIsAuthenticated(true);
        })
        .catch(err => {
          console.error(" Profile fetch error:", err);
          localStorage.removeItem('token');
          navigate('/login');
        });
    } else {
      console.log('✅ User context already exists');
      setIsAuthenticated(true);
    }
  }, [navigate, setUser, user]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
