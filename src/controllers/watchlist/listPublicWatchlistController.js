import { listPublicWatchlist } from "../../models/watchlistModel.js"

const listPublic = async (req, res, next) => {

    try {
        const watchlist = await listPublicWatchlist()

        return res.json({
            message: "Watchlists listadas com sucesso",
            watchlist
        })
    } catch(error){
        next(error)

    }
    
}

export default listPublic