import mongoose from "mongoose";

const Schema = mongoose.Schema
const userSchema = new Schema({
    name:{
        type:String,
        required:true,

    },
    email:{
        type: String,
        unique : true ,
        lowercase : true ,  
    },
    password:{
        type:String,
        required:true,

    },

    bookings:[{
        type: mongoose.Types.ObjectId,ref:"Booking"
    }]
})

export default mongoose.model("user",userSchema);