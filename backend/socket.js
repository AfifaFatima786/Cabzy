const socketIo=require('socket.io');
const userModel=require('./models/userModel')
const captainModel=require('./models/captainModel')

let io;

function initialiseSocket(server){
    io=socketIo(server,{
        cors:{
            origin:['http://localhost:5173','https://27nsxtfm-5173.inc1.devtunnels.ms'],
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

        socket.on('update-location-captain',async (data)=>{
            const {userId,location}=data;

            if(!location || !location.ltd || !location.lng){
                return socket.emit('error',{message:"Invalid location details"})
            }

            await captainModel.findByIdAndUpdate(userId,{
                location: {
                type: 'Point',
                coordinates: [location.lng, location.ltd] // [longitude, latitude]
  }
            })

        })


        socket.on('disconnect',()=>{
            console.log(`Client disconnected : ${socket.id}`)

        })
    })
}

function sendMessageToSocketId(socketId,messageObject){
    if(io){
        io.to(socketId).emit(messageObject.event,messageObject.data);
    }else{
        console.log('Socket.io is not initialised')
    }
}

module.exports={initialiseSocket,sendMessageToSocketId}