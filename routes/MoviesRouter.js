import express from 'express';
import { addMovie,getAllMovies, getMovieId } from '../controllers/MovieController';



const movieRouter = express.Router();
movieRouter.get("/",getAllMovies);
movieRouter.get("/:id",getMovieId);

movieRouter.post("/",addMovie);



export default movieRouter;
