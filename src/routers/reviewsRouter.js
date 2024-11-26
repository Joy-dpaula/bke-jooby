import express from 'express'
import updateReview from '../controllers/reviews/updateController.js'
import getReviews from '../controllers/reviews/getReviewsController.js'
import reviews from '../controllers/reviews/reviewsController.js'
import remove from '../controllers/reviews/removeReviewsController.js'
import { auth } from '../middlewares/auth.js'

const router = express.Router();

router.use(auth)
router.post('/' , reviews)
router.get('/', getReviews)
router.delete('/:id', remove)
router.put('/:id' , updateReview)

export default router