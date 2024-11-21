import { listReviews} from "../../models/reviewsModel.js" 

const list = async (req, res, next) => {
    try{
        const avaliar = await listReviews(req.userLogged.public_id)
       
        return res.json({
            message: "Avaliações listadas com sucesso!",
            avaliar
        })
    } catch(error) {
        next(error)
    }
}

export default list