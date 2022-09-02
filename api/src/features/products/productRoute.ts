import { Router } from 'express'
import multer from 'multer'
import passport from 'passport'
import { multiUpload } from '../../middlewares/fileUpload'
import productController from './productController'

const productRoute = Router()

productRoute.get('', productController.findAll)
productRoute.get('/:id', productController.findOneById)
productRoute.post('',
    passport.authenticate("jwt"),
    multiUpload,
    productController.createOne)
productRoute.patch('', productController.updateOne)
productRoute.delete('', productController.deleteOne)

export default productRoute
