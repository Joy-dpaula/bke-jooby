import express from 'express'
import create from '../controllers/table/createController.js'
import getList from '../controllers/table/listController.js'
import get from '../controllers/table/getPublicController.js'
import del from '../controllers/table/removeController.js'
import update from '../controllers/table/updateController.js'

import { auth } from '../middlewares/auth.js'
const router = express.Router();

router.get('/list', getList)

router.use(auth)
router.post('/' , create)
router.get('/', get)
router.delete('/:id', del)
router.put('/:id', update)




export default router