import { Router } from 'express'
import addressController from './addressController'

const addressRoute = Router()

addressRoute.get('', addressController.findAll)
addressRoute.get('/:id', addressController.findOneById)
addressRoute.post('', addressController.createOne)
addressRoute.patch('', addressController.updateOne)
addressRoute.delete('', addressController.deleteOne)

export default addressRoute
