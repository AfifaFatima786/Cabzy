import React, { createContext } from 'react'
import { useState } from 'react'

export const UserDataContext=createContext()



function userContext({children}) {


    const [user,setUser]=useState({
        email:'',
        fullName:{
            firstName:'',
            lastName:''
        }
    })

  return (
    <div>
        <UserDataContext.Provider value={user}>
        {children}
        </UserDataContext.Provider>
        
        </div>
  )
}

export default userContext