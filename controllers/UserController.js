import Booking from "../models/Booking";
import User from "../models/User";

import bcrypt from 'bcrypt';
// get all users

export const getAllUsers = async (req,res,next) =>{
    let users;
    try {
        users = await User.find()

    }
    catch(err){
return console.log(err);;
    }
if(!users ){
    return res.status(500).json({msg:"No user found"})
}

return res.status(200).json({users})

};

// sign up users

export const signup = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password || name.trim() === "" || email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }

    let user;
    try {
        user = new User({ name, email, password }); // Use "new User()" instead of "new user()"
        user = await user.save();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Unexpected Error" });
    }

    if (!user) {
        return res.status(500).json({ message: "Unexpected Error" });
    }

    return res.status(201).json({id: user._id });
};


// update user

export const updateUser = async(req,res,next)=>{
    const id=req.params.id;
    const { name, email, password } = req.body;

    if (!name || !email || !password || name.trim() === "" || email.trim() === "" || password.trim() === "") {
        return res.status(400).json({ msg: 'Please fill all fields' });
    }

let user;
try{
user = await User.findByIdAndUpdate(id,{name,email,password});
}
catch(err){
    return console.log(err);
}
if(!user){
    return res.status(500).json({message:'User not found'});

}
res.status(200).json({message:"Updated successfully"})


}


// delete user

// export const deleteUser = async(req,res,next)=>{
//     const id=req.params.id;
//     const { name, email, password } = req.body;   

//     // if (!name || !email || !password || name.trim() === "" || email.trim() === "" || password.trim() === "") {
//     //     return res.status(400).json({ msg: 'Please fill all fields' });
//     // }

//     let user;
// try{
//     user = await user.findByIdAndRemove(id)
// }
// catch(err){
//     return console.log(err);
// }
// if(!user){
//     return res.status(500).json({message:'User not found'});

// }
// res.status(200).json({message:"Deleted successfully"})


// }


export const deleteUser = async (req, res, next) => {
    const id = req.params.id;

    try {
        const user = await User.findByIdAndDelete(id);
        
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        return res.status(200).json({ message: 'Deleted successfully' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Unexpected Error' });
    }
};


// Login

//  export const login =async(req,res,next)=>{
//     const {  email, password } = req.body;

//     if ( !email || !password ||  email.trim() === "" || password.trim() === "") {
//         return res.status(400).json({ msg: 'Please fill all fields' });
//     }

// let Existinguser;
// try{
// user = await User.findOne({email,password});
// }
// catch(err){
//     return console.log(err);
// }
// if(!user){
//     return res.status(500).json({message:'User not found'});

// }
// res.status(200).json({message:"Updated successfully"})

//  }








// export const login = async (req, res, next) => {
//     const { email, password } = req.body;

//     if (!email || !password || email.trim() === "" || password.trim() === "") {
//         return res.status(400).json({ msg: 'Please fill all fields' });
//     }

//     let existingUser;

//     try {
//         existingUser = await User.findOne({ email });
//         if (!existingUser) {
//             return res.status(400).json({ message: 'User not found' });
//         }

//         const isMatch = bcrypt.compare(password, existingUser.password);

//         if (!isMatch) {
//             return res.status(400).json({ message: 'Invalid password' });
//         }
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: 'Unexpected Error' });
//     }

//     res.status(200).json({ message: 'Login successful' });
// };




export const login = async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password || email.trim() === "" || password.trim() === "") {
      return res.status(400).json({ msg: 'Please fill all fields' });
    }
  
    let existingUser;
  
    try {
      existingUser = await User.findOne({ email });
  
      if (!existingUser) {
        return res.status(400).json({ message: 'User not found' });
      }
  
      const isMatch = bcrypt.compare(password, existingUser.password);
  
      if (!isMatch) {
        return res.status(400).json({ message: 'Invalid password' });
      }
  
      // Include the user's ID in the response
      const userId = existingUser._id;
      res.status(200).json({ message: 'Login successful', userId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Unexpected Error' });
    }
  };
  






export const getBookingsOfUser = async(req,res,next)=>{
    const id=req.params.id;
    let bookings;
try{
   bookings = await Booking.find({user:id})
}
catch(err){
    return console.log(err);
}
if(!bookings){
    return res.status(404).json({msg:"No bookings for this user"})
}
res.status(200).json(bookings)
}



