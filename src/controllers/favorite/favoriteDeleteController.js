import { deleteFavorites,  favoriteValidateId } from "../../models/favoriteModel.js"

const removeFavorite = async (req, res, next) => {
    const {id} = req.params
    try{
        const  favoritesValidate =  favoriteValidateId(+id)

        if(favoritesValidate?.error)
            return res.status(401).json({
                error: "Erro ao deletar filme favorito",
                fieldErrors: favoritesValidate.error.flatten().fieldErrors
            })

        const favorite = await deleteFavorites(favoritesValidate.data.id, req.userLogged.public_id)

        return res.json({
            success: "Favorito excluído com sucesso",
            watchlist
        }) 
    } catch(error){
        if(error?.code === 'P2025')
            return res.status(404).json({
                error: `Favorito com o id ${id} não encontrado!`
            })
        next(error)
    }
}

export default removeFavorite