import express from 'express'
import create from '../controllers/watchlist/createWatchlistController.js'
import getList from '../controllers/watchlist/lisPublicWatchlistController.js'
import get from '../controllers/watchlist/listWatchlistController.js'
import del from '../controllers/watchlist/removeWatchlistController.js'
import update from '../controllers/watchlist/updateWatchlistController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router();

router.get('/list', getList)

router.use(auth)
router.post('/' , create)
router.get('/', get)
router.delete('/:id', del)
router.put('/:id', update)

export default router