import mongoose from "mongoose"
 const addminSchema  = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        minLength:6
    },
    addedMovies:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Movie"

        },
    ],
});

export default mongoose.model("Admin",addminSchema)