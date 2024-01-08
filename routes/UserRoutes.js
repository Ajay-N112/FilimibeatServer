import  express  from "express";
import { getAllUsers,signup, updateUser,deleteUser, login, getBookingsOfUser,  } from "../controllers/UserController";


const userRouter = express.Router();


// getusers
userRouter.get("/",getAllUsers)
// users
userRouter.post("/signup",signup)
// id of users
userRouter.put("/:id",updateUser)
// delete user
userRouter.delete("/:id",deleteUser)

// Login user
userRouter.post("/login",login)


userRouter.get("/bookings/:id",getBookingsOfUser)



export default userRouter;