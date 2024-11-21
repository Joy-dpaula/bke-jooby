import { PrismaClient } from '@prisma/client'
import { optional, z } from 'zod'

const prisma = new PrismaClient()

const favoriteSchema = z.object({
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

export const favoriteValidateId = (id) => {
    const partialFavoriteSchema = favoriteSchema.partial({
        movieId: true,
        watched: true,
        user_id: true,

    })
    return partialFavoriteSchema.safeParse({ id })
}

export const favoriteValidateToCreate = (favorites) => {
    const partialFavoriteSchema = favoriteSchema.partial({ id: true, user_id: true })
    return partialFavoriteSchema.safeParse(favorites)
}

export const listFavorites = async (public_id) => {
    const favorites = await prisma.favorites.findMany({
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
    return favorites
}

export const deleteFavorites = async (id, public_id) => {
    const favorite = await prisma.favorites.delete({
        where: {
            id: id,
            user: {
                public_id
            }
        }
    })
    return favorite
}

export const creatFavorite = async (favorites) => {
    const result = await prisma.favorites.create({
        data: favorites
    })
    return result
}