import express from 'express'
import createWatchlist from '../controllers/watchlist/createWatchlistController.js'
import listPublics from '../controllers/watchlist/listPublicWatchlistController.js'
import listWatchlist from '../controllers/watchlist/listWatchlistController.js'
import deleteWatchlist from '../controllers/watchlist/removeWatchlistController.js'
import updateWatchlist from '../controllers/watchlist/updateWatchlistController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router();

router.use(auth)
router.post('/' , createWatchlist)
router.get('/', listWatchlist)
router.get('/list', listPublics)
router.delete('/:id', deleteWatchlist)
router.put('/:id', updateWatchlist)

export default router