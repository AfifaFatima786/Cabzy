

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const UserProtectWrapper = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null); // null = not checked yet

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    if (!token) {
      navigate('/login');
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  // Show nothing or a loader until token is checked
  if (isAuthenticated === null) {
    return null; // or <Loader />
  }

  return <>{children}</>;
};

export default UserProtectWrapper;
