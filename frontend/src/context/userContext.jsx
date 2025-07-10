import React, { createContext } from 'react'
import { useState } from 'react'

export const UserDataContext=createContext()



const UserContextProvider=({children})=>{


    const [user,setUser]=useState({
        
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })

  return (
    <div>
        <UserDataContext.Provider value={{user,setUser}}>
        {children}
        </UserDataContext.Provider>
        
        </div>
  )
}

export default UserContextProvider