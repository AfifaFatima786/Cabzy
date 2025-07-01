import React from "react";
import axios from "axios";

import { useNavigate } from "react-router-dom";

export const CaptainLogout=()=>{
    
    const navigate=useNavigate()
    // Always pass the string in localstorage methods  not a varibale 
   
    axios.get(`${import.meta.env.VITE_BASE_URL}/captain/logout`,{withCredentials:true}).then((response)=>{
        if(response.status==200){
            localStorage.removeItem('token');
            navigate('/captain-login')
        }
    })



    return(
        <div>CaptainLogout</div>
    )
}

export default CaptainLogout