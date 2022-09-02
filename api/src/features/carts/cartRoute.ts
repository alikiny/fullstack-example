import { Router } from 'express'
import cartController from './cartController'

const cartRoute = Router()

cartRoute.get('', cartController.findAll)
cartRoute.get('/:id', cartController.findOneById)
cartRoute.post('', cartController.createOne)
cartRoute.patch('', cartController.updateOne)
cartRoute.delete('', cartController.deleteOne)

export default cartRoute
