import express from 'express'
import { searchMovies } from "../controllers/movies/getMovieController.js";


import { getMovieById } from "../controllers/movies/getMovieByIdController.js";

const router = express.Router();


router.get('/search/:query', searchMovies);

router.get('/movie-info/:id', getMovieById);

export default router;

