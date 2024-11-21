
import { PrismaClient } from '@prisma/client';
import fetch from 'node-fetch';

const prisma = new PrismaClient();

export const fetchAndSaveMovies = async (query) => {
    const api_key = process.env.TMDB_API_KEY;
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query=${query}&language=pt-BR`, {
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer 528e5a120a135df10c177389a8481736'
        }
    });

    const data = await response.json();

    const savedMovies = await Promise.all(
        data.results.map(async (movie) => {
            const { id: tmdb_id, title, poster_path, overview, release_date } = movie;

            const parsedReleaseDate = release_date ? new Date(release_date) : null;
            const isValidDate = parsedReleaseDate instanceof Date && !isNaN(parsedReleaseDate);


            return await prisma.movie.upsert({
                where: { tmdb_id },
                update: {
                    title,
                    poster_path,
                    sinopse: overview,
                    release_date: isValidDate ? parsedReleaseDate : null,
                },
                create: {
                    tmdb_id,
                    title,
                    poster_path,
                    sinopse: overview,
                    release_date: isValidDate ? parsedReleaseDate : null,

                },
            });
        })
    );

    return savedMovies;
};

export const getMovies = async () => {
    return await prisma.movie.findMany();
};

    
export const getMovieByIdModel = async (id) => {

    const result = await prisma.movie.findUnique({
        where: {
            id
        }
    })
    return result

};

