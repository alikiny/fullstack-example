import { NextFunction, Request, Response } from 'express'

import Address from '../addresses/Address'
import Image from '../images/Image'
import Product from './Product'
import productService from './productService'

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let files: Express.Multer.File[] = []
    if (req.files?.length && req.files.length > 0) {
      files = JSON.parse(JSON.stringify(req.files))
    }
    const user = req.user
    const product = new Product({
      sellerId: user?._id,
      ...req.body
    })
    const images = files.map(file => new Image(
      { data: file.buffer, userId: user?._id, productId: product._id}
    ))
    return res.json(await productService.createOne(product, images))
  } catch (e) {
    return next(e)
  }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { categories, cities, page, limit, sort } = req.query as any
    return res.json(
      await productService.findByFilter(categories, cities, page, limit, sort)
    )
  } catch (e) {
    return next(e)
  }
}

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await productService.findOneById(req.params.id))
  } catch (e) {
    next(e)
  }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const update = req.body
    return res.json(await productService.updateOne(id, update))
  } catch (e) {
    next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    return res.json(await productService.deleteOne(id))
  } catch (e) {
    next(e)
  }
}

export default {
  createOne,
  findAll,
  findOneById,
  updateOne,
  deleteOne,
}
