import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';
import userRouter from "./routes/UserRoutes";
import AdminRouter from "./routes/AdminRoutes";
import movieRouter from "./routes/MoviesRouter";
import bookingRouter from "./routes/BookingRoutes";

dotenv.config();
const app = express();
const port = 8000;

// Middleware to enable CORS
app.use(cors());

// Other middlewares
app.use(express.json());

// Routers
app.use("/user", userRouter);
app.use("/admin", AdminRouter);
app.use("/movie", movieRouter);
app.use("/booking", bookingRouter);

// MongoDB connection
mongoose.connect(
  `mongodb+srv://ajaynarayanan112:${process.env.MONGODB_PASSWORD}@cluster0.myhc87a.mongodb.net/`
).then(() => app.listen(port, () => console.log(`Server is running on port ${port}`)))
  .catch((e) => console.log(e));
