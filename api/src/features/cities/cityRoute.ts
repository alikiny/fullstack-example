import { Router } from 'express'
import cityController from './cityController'

const cityRoute = Router()

cityRoute.get('', cityController.findAll)
cityRoute.get('/:id', cityController.findOneById)
cityRoute.post('', cityController.createOne)
cityRoute.patch('', cityController.updateOne)
cityRoute.delete('', cityController.deleteOne)

export default cityRoute
