import { Router } from 'express'
import productReviewController from './productReviewController'

const productReviewRoute = Router()

productReviewRoute.get('', productReviewController.findAll)
productReviewRoute.get('/:id', productReviewController.findOneById)
productReviewRoute.post('', productReviewController.createOne)
productReviewRoute.patch('', productReviewController.updateOne)
productReviewRoute.delete('', productReviewController.deleteOne)

export default productReviewRoute
