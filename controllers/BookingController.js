// // BookingController.js

// import mongoose from 'mongoose';
// import Booking from '../models/Booking';
// import User from '../models/User';
// import Movies from '../models/Movies';


// export const newBooking = async (req, res, next) => {
//     const { movie, date, seatNumber, user } = req.body;

// let existingMovie;
// let existingUser;
// try{
//     existingMovie = await Movies.findById(movie);
//     existingUser = await User.findById(user)

// }catch(err){
// return console.log(err);
// }
// if(!existingMovie){
//     return req.status(404).json({message:"Movie illaa"})
// }
// if(!existingUser){
//     return req.status(422).json({message: "User not found."});
// }


//     let newBooking;

//     try {
//         newBooking = new Booking({ movie, date: new Date(date), seatNumber, user });
// const session = await mongoose.startSession();
//  session.startTransaction();
// existingUser.bookings.push(newBooking),
// existingMovie.bookings.push(newBooking),
// await existingUser.save({session}),
// await existingMovie.save({session}),
// await newBooking.save({session})
// session.commitTransaction();

//         // newBooking = await newBooking.save();
//     } catch (err) {
//         if (err.name === 'ValidationError') {
//             // Log detailed validation errors
//             console.error(err.errors);
//             return res.status(422).json({ message: 'Validation failed', errors: err.errors });
//         }

//         console.error(err);
//         return res.status(500).json({ message: 'Unable to create booking' });
//     }

//     if (!newBooking) {
//         return res.status(500).json({ message: 'Unable to create booking' });
//     }

//     return res.status(201).json({ newBooking });
// };


// BookingController.js

import mongoose from 'mongoose';
import Booking from '../models/Booking';
import User from '../models/User';
import Movies from '../models/Movies';

export const newBooking = async (req, res, next) => {
    const { movie, date, seatNumber, user } = req.body;
    // console.log(movie, date, seatNumber, user);

    let existingMovie;
    let existingUser;

    try {
        existingMovie = await Movies.findById(movie);
        existingUser = await User.findById(user);

        if (!existingMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        if (!existingUser) {
            return res.status(422).json({ message: "User not found" });
        }

        let newBooking = new Booking({ movie, date: new Date(date), seatNumber, user });

        const session = await mongoose.startSession();
        session.startTransaction();

        try {
            // Check if existingUser.bookings is an array
            if (!Array.isArray(existingUser.bookings)) {
                existingUser.bookings = [];
            }

            existingUser.bookings.push(newBooking);
            await existingUser.save({ session });
        } catch (err) {
            console.error(err);
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ message: 'Error updating user bookings' });
        }

        try {
        
            if (!Array.isArray(existingMovie.booking)) {
                existingMovie.booking = [];
            }

            existingMovie.booking.push(newBooking);
            await existingMovie.save({ session });
        } catch (err) {
            console.error(err);
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ message: 'Error updating movie bookings' });
        }

        try {
            await newBooking.save({ session });
        } catch (err) {
            console.error(err);
            await session.abortTransaction();
            session.endSession();
            return res.status(500).json({ message: 'Error saving new booking' });
        }

        await session.commitTransaction();

        return res.status(201).json({ message: 'Booking created successfully', booking: newBooking });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error creating booking' });
    }
};


export const getBookingById = async (req, res, next) => {
    let id = req.params.id;
    let foundBooking;

    try {
        foundBooking = await Booking.findById(id);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: 'Error finding booking by ID' });
    }

    if (!foundBooking) {
        return res.status(404).json({ message: 'Could not find booking for the provided ID' });
    }

    return res.status(200).json({ foundBooking });
};



// delete booking
// export const deleteBooking = async (req, res) => {
//     const id = req.params.id;
//     let booking;

//     try {
//         booking = await Booking.findByIdAndRemove(id).populate("user movie");
//         //  booking = await Booking.findOneAndDelete({ _id: id }).populate("user movie");

//         console.log(booking);

//         const session = await mongoose.startSession();
//         session.startTransaction();

//         await booking.user.bookings.pull(booking);
//         await booking.movie.bookings.pull(booking);

//         await booking.movie.save({ session });
//         await booking.user.save({ session });

//         session.commitTransaction();
//     } catch (err) {
//         console.error(err);
//         return res.status(500).json({ message: "Unable to delete" });
//     }

//     if (!booking) {
//         return res.status(500).json({ message: "Unable to delete" });
//     }

//     return res.status(200).json({ message: "Successfully deleted" });
// };