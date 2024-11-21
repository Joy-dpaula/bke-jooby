import { listFavorites } from "../../models/favoriteModel.js" 

const listFavorite = async (req, res, next) => {
    try{
        const favorite = await listWatchlist(req.userLogged.public_id)
       
        return res.json({
            message: "Favoritos listados com sucesso",
            favorite
        })
    } catch(error) {
        next(error)
    }
}

export default listFavorite