// src/controllers/movieController.js
import { fetchAndSaveMovies, getMovies } from '../../models/moviesModel.js';

export const searchMovies = async (req, res) => {
    const { query } = req.params;
    
    try {
        const savedMovies = await fetchAndSaveMovies(query);
        res.json(savedMovies);
    } catch (error) {
        console.error('Erro ao buscar os filmes no TMDB:', error.message);
        res.status(500).json({ message: 'Erro ao buscar dados do TMDB' });
    }
};

export const listMovies = async (req, res) => {
    try {
        const movies = await getMovies();
        res.json(movies);
    } catch (error) {
        console.error('Erro ao listar filmes:', error.message);
        res.status(500).json({ message: 'Erro ao listar filmes' });
    }
};