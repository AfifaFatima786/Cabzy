const express=require('express')
const app=express()
const dotenv=require('dotenv')
dotenv.config()
const cors=require('cors')
const connectToDb=require('./db/db')
const userRoutes=require('./routes/userRoutes')
const cookieParser=require('cookie-parser')
const captainRoutes = require('./routes/captainRoutes')


connectToDb()


app.use(cors({origin: 'http://localhost:5173', // or your frontend URL
  credentials: true}));
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser());


app.get('/',(req,res)=>{
    res.send('Hello World');
})

app.use('/users',userRoutes)
app.use('/captain',captainRoutes)


module.exports=app;