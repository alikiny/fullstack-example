import { NextFunction, Request, Response } from 'express'
import Image from './Image'
import imageService from './imageService'

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const image = new Image(req.body.image)
    return res.json(await imageService.createOne(image))
  } catch (e) {
    return next(e)
  }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await imageService.findAll())
  } catch (e) {
    return next(e)
  }
}

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.end((await imageService.findOneById(req.params.id)).data)
  } catch (e) {
    next(e)
  }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const update = req.body
    return res.json(await imageService.updateOne(id, update))
  } catch (e) {
    next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    return res.json(await imageService.deleteOne(id))
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
