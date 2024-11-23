import { listWatchlist } from "../../models/watchlistModel.js" 

const listWatchList = async (req, res, next) => {
    try{
        const watchlist = await listTable(req.userLogged.public_id)
       
        return res.json({
            message: "Watchlists listadas com sucesso!",
            watchlist
        })
    } catch(error) {
        next(error)
    }
}

export default listWatchList