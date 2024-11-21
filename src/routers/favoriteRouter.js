import express from 'express'
import create from '../controllers/favorite/favoriteController.js'
import getList from '../controllers/favorite/favoriteListController.js'
import del from '../controllers/favorite/favoriteRemoveController.js'
import { auth } from '../middlewares/auth.js'
const router = express.Router();


router.use(auth)
router.post('/' , create)
router.get('/', getList)
router.delete('/:id', del)



export default router