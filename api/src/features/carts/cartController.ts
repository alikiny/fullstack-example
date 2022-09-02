import { NextFunction, Request, Response } from 'express'
import Cart from './Cart'
import cartService from './cartService'

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cart = new Cart(req.body.cart)
    return res.json(await cartService.createOne(cart))
  } catch (e) {
    return next(e)
  }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, page, sort } = req.body
    return res.json(await cartService.findAll(page, limit, sort))
  } catch (e) {
    return next(e)
  }
}

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await cartService.findOneById(req.params.id))
  } catch (e) {
    next(e)
  }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const update = req.body
    return res.json(await cartService.updateOne(id, update))
  } catch (e) {
    next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    return res.json(await cartService.deleteOne(id))
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
