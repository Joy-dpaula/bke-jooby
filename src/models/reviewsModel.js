import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const reviewSchema = z.object({
    id: z.number({
        invalid_type_error: "O id deve ser um valor numérico",
        required_error: "O id é obrigatório"
    })
        .positive({ message: "O id deve ser um número positivo maior que 0" }),

    user_id: z.string({
        invalid_type_error: "O user_id deve ser um valor numérico",
        required_error: "O user_id é obrigatório"
    }),
    movieId: z.number({
        invalid_type_error: "O movieId deve ser um valor numérico",
        required_error: "O movieId é obrigatório"
    }).positive({ message: "O movieId deve ser um número positivo maior que 0" })
    .optional(),

    comment: z.string({
        required_error: "O comment é obrigatório",
        invalid_type_error: "O comment deve ser um texto"
    }).min(1, { message: "O comment não pode estar vazio" })
    .optional(),

    rating: z.number({
        invalid_type_error: "O rating deve ser um valor numérico",
        required_error: "O rating é obrigatório"
    }).int().min(0, { message: "O rating deve ser pelo menos 0" }).max(5, { message: "O rating deve ser no máximo 5" })
    ,

    createdAt: z.date().default(() => new Date())
    ,



})

export const reviewsValidateToUpdate = (review) => {
    const partialReviewSchema = reviewSchema.partial({ user_id: true })
    return partialReviewSchema.safeParse(review)
}

export const reviewValidateId = (id) => {
    const partialReviewSchema = reviewSchema.partial({
        movieId: true,
        comment: true,
        rating: true,
        user_id: true,
        createdAt: true
    })
    return partialReviewSchema.safeParse({ id })
}

export const reviewValidateToCreate = (reviews) => {
    const partialReviewSchema = reviewSchema.partial({ id: true, user_id: true })
    return partialReviewSchema.safeParse(reviews)
}

export const listReviews = async (public_id) => {
    const reviews = await prisma.reviews.findMany({
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
    return reviews
}

export const deleteReview = async (id, public_id) => {
    const review = await prisma.reviews.delete({
        where: {
            id: id,
            user: {
                public_id
            }
        }
    })
    return review
}

export const review = async (reviews) => {
    const result = await prisma.reviews.create({
        data: reviews
    })
    return result
}

export const update = async (review, public_id) => {
    const result = await prisma.reviews.update({
        data: review,
        where: {
            id: review.id,
            user: {
                public_id
            }
        }
    })
    return result
}



