// import { JsonWebTokenError } from "jsonwebtoken";
import Admin from "../models/Admin";
import jwt from "jsonwebtoken";

// Admin sign up

export const addAdmin =async (req,res,next)=>{
    const {email,password}=req.body;

    let existingAdmin;
    try{
existingAdmin = await Admin.findOne({email})
    }
    catch(err){
        return console.log(err);

 
    }


    if(existingAdmin){
        return res.status(400).json('Email already exists')
    }


    let admin;
    const fetchPassword = (password)  
    try{
admin = new Admin({email,password:fetchPassword});
admin = await admin.save();
    }catch(err){
return console.log(err);

}
if(!admin){
    return res.status(500).send("Creating user failed")
}
return res.status(200).json({admin})
};


// Admin Login

export const adminLogin = async(req,res,next)=>{
    const { email, password } = req.body;

    if (!email || !password || email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }
let existingAdmin;
try{
existingAdmin = await Admin.findOne({email})
}catch(err){
    return console.log(err);
}
if (!existingAdmin) {
    return res.status(401).json({ error: 'Invalid Credentials' });
}
const isPasswordCorrect = (password==existingAdmin.password)

if(!isPasswordCorrect){
    return res.status(401).json({ error: "Invalid Password" })
}


const token = jwt.sign({id:existingAdmin._id},process.env.SECRET_KEY,)

return res.status(200).json({message:"Authentication completed",token,id:existingAdmin._id})

}


export const getAdmins = async(req,res,next)=>{
    let admins;
    try{
admins = await Admin.find();
    }catch(err){
return console.log(err);
    }
    if(!admins){
        return res.status(500).json({msg:'server adichu poi'});
    }
    return res.status(200).json({admins})
}



export const getAdminById=async(req,res)=>{
    const id = req.params.id;
    let admin;
    try{
        admin = await Admin.findById(id).populate("addedMovies");

    }
    catch(err){
        return console.log(err);
    };
    if (!admin){
        return console.log("cannot find Admin");
    }
    return res.status(200).json({admin});
};