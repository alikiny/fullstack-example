import { NextFunction, Request, Response } from 'express'
import Category from './Category'
import categoryService from './categoryService'

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const category = new Category({name: req.body.name})
    return res.json(await categoryService.createOne(category))
  } catch (e) {
    return next(e)
  }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await categoryService.findAll())
  } catch (e) {
    return next(e)
  }
}

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await categoryService.findOneById(req.params.id))
  } catch (e) {
    next(e)
  }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const update = req.body
    return res.json(await categoryService.updateOne(id, update))
  } catch (e) {
    next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    return res.json(await categoryService.deleteOne(id))
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
