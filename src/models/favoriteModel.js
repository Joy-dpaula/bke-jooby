import {PrismaClient} from '@prisma/client'
import {optional, z} from 'zod'

const prisma = new PrismaClient()



const watchlistSchema = z.object({
    id: z.number({
        invalid_type_error: "O id deve ser um valor numérico",
        required_error: "O id é obrigatório"
    })
    .positive({ message: "O id deve ser um número positivo maior que 0" }),

    user_id: z.string({
        invalid_type_error: "O user_id deve ser um valor numérico",
        required_error: "O user_id é obrigatório"
    }),

    movie_id: z.number({
        invalid_type_error: "O movie_id deve ser um valor numérico",
        required_error: "O movie_id é obrigatório"
    }).positive({ message: "O movie_id deve ser um número positivo maior que 0" })
    .optional(),

    watched: z.boolean().default(false)
    .optional()
});




export const watchlistValidateId = (id) => {
    const partialWatchlistSchema = watchlistSchema.partial({
        movieId: true,
        watched: true,
        user_id: true,
    
    })
    return partialWatchlistSchema.safeParse({id})
}


export const watchlistValidateToCreate = (watchlist) => {
    const partialWatchlistSchema = watchlistSchema.partial({id: true, user_id: true})
    return partialWatchlistSchema.safeParse(watchlist)
}

export const listWatchlist = async (public_id) => {
    const watchlist = await prisma.watchlist.findMany({
        where: {
            user: {
                public_id
            }
        },
        include: {
            movie: true, 
            user: true   
        },
    })
    return watchlist
}

export const deleteWatchlist = async (id, public_id) => {
    const watchlist = await prisma.watchlist.delete({
        where: {
            id: id,
            user:{
                public_id
            }
        }
    })
    return watchlist
}


export const watchlist = async (watchlist) => {
    const result = await prisma.watchlist.create({
         data: watchlist
    })
    return result
}