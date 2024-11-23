import {PrismaClient} from '@prisma/client'
import {z} from 'zod'

const prisma = new PrismaClient()

const watchlistSchema = z.object({
    id: z.number({
        invalid_type_error: "O id deve ser um valor numérico",
        required_error: "O id é obrigatório",
      }).positive({ message: "O id deve ser um número positivo maior que 0" }),
    
      name: z.string({
        invalid_type_error: "O nome deve ser um texto",
        required_error: "O nome é obrigatório",
      }).min(1, { message: "O nome não pode estar vazio" }).max(100, { message: "O nome pode ter no máximo 100 caracteres" }),
    
      description: z.string({
        invalid_type_error: "A descrição deve ser um texto",
        required_error: "A descrição é obrigatória",
      }).min(1, { message: "A descrição não pode estar vazia" }).max(700, { message: "A descrição pode ter no máximo 700 caracteres" }),
    
      movies: z.array(z.number()).min(1, { message: "Deve conter ao menos 1 filme" }),
      user_id: z.number({
        invalid_type_error: "O user_id deve ser um valor numérico",
        required_error: "O user_id é obrigatório",
      }),

          
})

export const watchlistValidateToUpdate = (watchlist) => {
    const partialWatchlistSchema= watchlistSchema.partial({user_id: true})
    return partialWatchlistSchema.safeParse(watchlist)
}

export const watchlistValidateId = (id) => {
    const partialWatchlistSchema = watchlistSchema.partial({
        movies: true,
        description: true,
        name: true,
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
            movies: true, 
        },
    })
    return watchlist
}

export const listPublicWatchlist = async () => {
    const result = await prisma.watchlist.findMany({
        include: {
            movies: true, 
        },
    })

    return result

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


export const createWatchlist = async (watchlistData) => {
    const { name, description, user_id, movies } = watchlistData;

    const result = await prisma.watchlist.create({
        data: {
            name,
            description,
            user_id,
            movies: {
                connect: movies?.map((id) => ({ id })), 
            },
        },
        include: {
            movies: true, 
        },
    });

    return result;
};

export const updateWatchlist = async (watchlist, public_id) => {
    const result = await prisma.watchlist.update({
        where: {
            id: watchlist.id,
            user: { public_id },
        },
        data: {
            name: watchlist.name,
            description: watchlist.description,
            movies: watchlist.movieIds
                ? { set: watchlist.movieIds.map(id => ({ id })) }
                : undefined, 
        },
        include: {
            movies: true, 
        },
    });

    return result;
};


