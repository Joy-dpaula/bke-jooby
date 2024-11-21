import { update, reviewsValidateToUpdate } from "../../models/reviewsModel.js"
import { getByPublicId } from '../../models/authModel.js'

const updateController = async (req, res, next) => {
    const {id} = req.params
    try{
        const review = req.body
        review.id = +id

        const reviewValidated = reviewsValidateToUpdate(review)

        if(reviewValidated?.error)
            return res.status(401).json({
                error: "Erro ao atualizar a conta!",
                fieldErrors: reviewValidated.error.flatten().fieldErrors
            })

        const user = await getByPublicId(req.userLogged.public_id)

        if(!user)
            return res.status(401).json({
                error: "Public ID Inválido!"
            })

            reviewValidated.data.user_id = user.public_id; 

        const result = await update(reviewValidated.data, req.userLogged.public_id)

        if(!result)
            return res.status(401).json({
                error: "Erro ao criar atualizar!"
            })

        return res.json({
            success: "Conta atualizada com sucesso!",
            review: result
        })
    } catch(error) {
        if(error?.code === 'P2025')
            return res.status(404).json({
                error: `Conta com o id ${id}, não encontrado!`
            })
        next(error)
    }
}

export default updateController