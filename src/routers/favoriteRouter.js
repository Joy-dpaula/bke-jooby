import express from 'express'
import createFavorite from '../controllers/favorite/favoriteController.js'
import listFavorite from '../controllers/favorite/favoriteListController.js'
import removeFavorite from '../controllers/favorite/favoriteDeleteController.js'

import { auth } from '../middlewares/auth.js'
const router = express.Router();

router.use(auth)
router.post('/' , createFavorite)
router.get('/', listFavorite)
router.delete('/:id', removeFavorite)

export default router