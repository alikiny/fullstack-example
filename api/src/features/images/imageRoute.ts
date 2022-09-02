import { Router } from 'express'
import imageController from './imageController'

const imageRoute = Router()

imageRoute.get('', imageController.findAll)
imageRoute.get('/:id', imageController.findOneById)
imageRoute.post('', imageController.createOne)
imageRoute.patch('', imageController.updateOne)
imageRoute.delete('', imageController.deleteOne)

export default imageRoute
