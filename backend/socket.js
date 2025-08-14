const socketIo=require('socket.io');
const userModel=require('./models/userModel')
const captainModel=require('./models/captainModel')

let io;

function initialiseSocket(server){
    io=socketIo(server,{
        cors:{
            origin:['http://localhost:5173','http://localhost:3000','https://27nsxtfm-5173.inc1.devtunnels.ms'],
            methods:['GET','POST'],
            credentials: true
        }
    })

    io.on('connection',(socket)=>{
        console.log(`Client connected : ${socket.id} as `)


        socket.on('join',async (data)=>{
            console.log(data,"pront hokr data \n")
            const {userId,userType}=data;
            console.log(userId+" yhaa id h socket.js m")

            if(userType==='user'){
                console.log(`🔵 User ${userId} joining with socket ${socket.id}`)
                
                await userModel.findByIdAndUpdate(userId,{
                    socketId:socket.id

                });
                console.log(`✅ User socket ID updated in database`)
            }
            else if(userType==='captain'){
                console.log(`🟡 Captain ${userId} joining with socket ${socket.id}`)
                            await captainModel.findByIdAndUpdate(userId,{
                socketId:socket.id,
                status: 'active' // Set captain as active when they join

            });
            }
            
        });

        socket.on('update-location-captain',async (data)=>{
            const {userId,location}=data;

            if(!location || !location.coordinates){
                return socket.emit('error',{message:"Invalid location details"})
            }

            await captainModel.findByIdAndUpdate(userId,{
                location: location
            })

        })


        socket.on('disconnect',()=>{
            console.log(`Client disconnected : ${socket.id}`)

        })
    })
}

function sendMessageToSocketId(socketId,messageObject){
    if(io){
        console.log(`📤 Sending ${messageObject.event} to socket ${socketId}`)
        console.log(`📤 Message data:`, messageObject.data)
        io.to(socketId).emit(messageObject.event,messageObject.data);
        console.log("✅ Socket io working fine")
    }else{
        console.log('❌ Socket.io is not initialised')
    }
}

module.exports={initialiseSocket,sendMessageToSocketId}