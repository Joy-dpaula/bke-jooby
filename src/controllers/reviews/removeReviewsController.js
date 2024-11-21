import { deleteReview,  reviewValidateId } from "../../models/reviewsModel.js"

const remove = async (req, res, next) => {
    const {id} = req.params
    try{
        const  reviewValidate =  reviewValidateId(+id)

        if(reviewValidate?.error)
            return res.status(401).json({
                error: "Erro ao deletar um serviço!",
                fieldErrors: reviewValidate.error.flatten().fieldErrors
            })

        const review = await deleteReview(reviewValidate.data.id, req.userLogged.public_id)

        return res.json({
            success: "Conta removida com sucesso!",
            review
        }) 
    }catch(error){
        if(error?.code === 'P2025')
            return res.status(404).json({
                error: `Conta com o id ${id}, não encontrado!`
            })
        next(error)
    }
}

export default remove