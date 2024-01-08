import  express  from "express";
// import {  deletBooking, getBookingById, newBooking, } from "../controllers/BookingController";
import {  getBookingById, newBooking } from "../controllers/BookingController";

const bookingRouter = express.Router();

bookingRouter.get('/:id', getBookingById)
bookingRouter.post('/',newBooking)
// bookingRouter.delete("/:id",deleteBooking)

export default bookingRouter;