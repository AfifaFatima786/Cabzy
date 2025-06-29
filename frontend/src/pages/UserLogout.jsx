import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export const UserLogout=()=>{
    
    const navigate=useNavigate()
    // Always pass the string in localstorage methods  not a varibale 
   
    axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`,{withCredentials:true}).then((response)=>{
        if(response.status==200){
            localStorage.removeItem('token');
            navigate('/login')
        }
    })



    return(
        <div>UserLogout</div>
    )
}

export default UserLogout