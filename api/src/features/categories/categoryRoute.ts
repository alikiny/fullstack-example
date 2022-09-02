import { Router } from 'express'
import categoryController from './categoryController'

const categoryRoute = Router()

categoryRoute.get('', categoryController.findAll)
categoryRoute.get('/:id', categoryController.findOneById)
categoryRoute.post('', categoryController.createOne)
categoryRoute.patch('', categoryController.updateOne)
categoryRoute.delete('', categoryController.deleteOne)

export default categoryRoute
