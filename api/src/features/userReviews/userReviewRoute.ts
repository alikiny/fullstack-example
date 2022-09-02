import { Router } from 'express'
import userReviewController from './userReviewController'

const userReviewRoute = Router()

userReviewRoute.get('', userReviewController.findAll)
userReviewRoute.get('/:id', userReviewController.findOneById)
userReviewRoute.post('', userReviewController.createOne)
userReviewRoute.patch('', userReviewController.updateOne)
userReviewRoute.delete('', userReviewController.deleteOne)

export default userReviewRoute
