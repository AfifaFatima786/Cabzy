const mongoose=require('mongoose')
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

const captainSchema=new mongoose.Schema({
    fullName:{
        firstName:{
            type:String,
            required:true,
            minLength:[3,'First name must be at least 3 characters long']
        },

        lastName:{
            type:String,
            minLength:[3,'Last name must be at least 3 characters long']
        }
    },

    email:{
        type:String,
        required:true,
        unique:true,
        minLength:[5,'Email must be at least 5 characters long']
    },
    password:{
        type:String,
        required:true,
        select:false
    },

    socketId:{
        type:String
    },


    status:{
        type:String,
        enum:['active','inactive'],
        default:'inactive'

    },
    vehicle:{
        color:{
            type:String,
            required:true,
            minLength:[3,'Color must be at least 3 characters long']

        },
        plate:{
            type:String,
            required:true,
            minLength:[3,'Plate must be at least 3 characters long']
        },
        capacity:{
            type:Number,
            required:true,
            min:[1,'Capacity muts be at least 1']
        },
        vehicleType:{
            type:String,
            required:true,
            enum:['car','motorcycle','auto']
        }
    },
    // location:{
    //     ltd:{
    //         type:Number
    //     },
    //     lng:{
    //         type:Number
    //     }

    // }


    location: {
  type: {
    type: String, // Must be "Point"
    enum: ['Point'],
    
  },
  coordinates: {
    type: [Number], // [longitude, latitude]
   
  }
}

})


captainSchema.index({ location: '2dsphere' });

captainSchema.methods.generateToken=async function(){
    const token=jwt.sign({_id:this._id},process.env.JWT_SECRET,{expiresIn:'24h'})
    console.log(token)
    
    return token;
}



captainSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password)
}

captainSchema.statics.hashPassword=async function(password){
    return await bcrypt.hash(password,10)
}





const captainModel=mongoose.model('captain',captainSchema);

module.exports=captainModel;