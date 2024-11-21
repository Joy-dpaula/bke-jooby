import { getMovieByIdModel } from "../../models/moviesModel.js";

export const getMovieById = async (req, res) => {
    const { id } = req.params;
    
    try {

        const movie = await getMovieByIdModel(+id);

        res.json(movie);
    } catch (error) {
        console.error('Erro ao buscar o filme pelo ID no TMDB:', error.message);
        res.status(500).json({ message: 'Erro ao buscar dados do TMDB' });
    }
};
