import React,{createContext,useEffect} from 'react'
import {io} from 'socket.io-client'


export const SocketContext=createContext();

const socket=io(`${import.meta.env.VITE_BASE_URL}`,{
    withCredentials: true,
})

const SocketProvider=({children})=>{
    useEffect(()=>{

        socket.on('connect',()=>{
            console.log('connected from server');

        })

        socket.on('disconnect',()=>{
            console.log('disconnected from server');

        })

       


    },[]);

    const sendMessage=(eventName,message)=>{
        console.log(message)
        console.log(`sending message: ${message} to ${eventName}`)
        socket.emit(eventName,message)

    }

    const receiveMessage=(eventName,callback)=>{
        socket.on(eventName,callback)
    }

    return(
        <SocketContext.Provider value={{socket,sendMessage,receiveMessage}}>
        {children}
        </SocketContext.Provider>
    )




}

export default SocketProvider