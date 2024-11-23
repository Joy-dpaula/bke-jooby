import { deleteWatchlist,  watchlistValidateId } from "../../models/watchlistModel.js"

const removeWatchlist = async (req, res, next) => {

    const {id} = req.params

    try{
        const watchlistValidate =  watchlistValidateId(+id)

        if(watchlistValidate?.error)
            return res.status(401).json({
                error: "Erro ao deletar a watchlist",
                fieldErrors: watchlistValidate.error.flatten().fieldErrors
            })

        const watchlist = await deleteWatchlist(watchlistValidate.data.id, req.userLogged.public_id)

        return res.json({
            success: "Watchlist removida com sucesso!",
            watchlist
        }) 

    } catch(error){
        if(error?.code === 'P2025')
            return res.status(404).json({
                error: `Watchlist com o id ${id} não encontrado!`
            })
        next(error)
    }
}

export default removeWatchlist