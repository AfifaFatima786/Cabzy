const socketIo=require('socket.io');
const userModel=require('./models/userModel')
const captainModel=require('./models/captainModel')

let io;

function initialiseSocket(server){
    io=socketIo(server,{
        cors:{
            origin:'http://localhost:5173',
            methods:['GET','POST'],
            credentials: true
        }
    })

    io.on('connection',(socket)=>{
        console.log(`Client connected : ${socket.id} as `)


        socket.on('join',async (data)=>{
            const {userId,userType}=data;
            console.log(userId+"yhaa id h socket.js m")

            if(userType==='user'){
                
                userModel.findById(userId)
                await userModel.findByIdAndUpdate(userId,{
                    socketId:socket.id

                });
            }
            else if(userType==='captain'){
                await captainModel.findByIdAndUpdate(userId,{
                    socketId:socket.id

                });

            }
            
        });


        socket.on('disconnect',()=>{
            console.log(`Client disconnected : ${socket.id}`)

        })
    })
}

function sendMessageToSocketId(socketId,message){
    if(io){
        io.to(socketId).emit('message',message);
    }else{
        console.log('Socket.io is not initialised')
    }
}

module.exports={initialiseSocket,sendMessageToSocketId}