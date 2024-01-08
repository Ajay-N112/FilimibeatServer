import Jwt from "jsonwebtoken";
import Movies from "../models/Movies";
import mongoose from "mongoose";
import Admin from "../models/Admin";

export const addMovie = async (req, res, next) => {
    const extractedToken = req.headers.authorization.split(" ")[1];
    if (!extractedToken || extractedToken.trim() === "") {
        return res.status(401).json({ message: "You are not logged in!" });
    }

    let adminId;

    // verify token
    Jwt.verify(extractedToken, process.env.SECRET_KEY, (err, decrypted) => {
        if (err) {
            return res.status(403).json({ message: `${err.message}` });
        } else {
            adminId = decrypted.id;
            return;
        }
    });

    // create movie
    const { title, description, actors, releaseDate, featured, posterUrl } = req.body;
    if (
        !title ||
        title.trim() === "" ||
        !description ||
        description.trim() === "" ||
        !posterUrl ||
        posterUrl.trim() === ""
    ) {
        return res.status(422).json({ message: "Invalid inputs" });
    }

    let movieInstance;
    try {
        movieInstance = new Movies({
            title,
            description,
            actors,
            releaseDate: new Date(`${releaseDate}`),
            featured,
            admin: adminId,
            posterUrl,
        });
        const session = await mongoose.startSession();
        const adminUser = await Admin.findById(adminId);
        session.startTransaction();
        await movieInstance.save({session});
        // movieInstance = await movieInstance.save();
        adminUser.addedMovies.push(movieInstance);
        await adminUser.save({session});
        await session.commitTransaction();
    } catch (err) {
        console.error(err);
        return res.status(500).json({ message: "Server error occurred while saving the movie." });
    }

    if (!movieInstance) {
        return res.status(500).json({ message: "Server error occurred while saving the movie." });
    }

    return res.status(201).json({ movieInstance });
};


// get all movies
export const getAllMovies = async (req, res, next) => {
    try {
        const movies = await Movies.find();

        if (!movies) {
            return res.status(500).json({ message: "Request failed" });
        }

        return res.status(200).json(movies);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server error occurred while fetching movies." });
    }
};
// get movie id

export const getMovieId = async (req,res,next)=>{
    const{id}= req.params;
let movie;
try{
movie = await Movies.findById(id)
}catch(err){
    return console.log(err);

}

if (!movie){
    return  res.status(404).json({message:"The movie with given ID does not exist."})
}
return res.status(200).json({movie})
}