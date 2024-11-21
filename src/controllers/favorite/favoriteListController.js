import { listWatchlist } from "../../models/favoriteModel.js" 

const list = async (req, res, next) => {
    try{
        const favorite = await listWatchlist(req.userLogged.public_id)
       
        return res.json({
            message: "Avaliações listadas com sucesso!",
            favorite
        })
    } catch(error) {
        next(error)
    }
}

export default list