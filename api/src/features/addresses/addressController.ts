import { NextFunction, Request, Response } from 'express'
import Address from './Address'
import addressService from './addressService'

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const address = new Address(req.body.address)
    return res.json(await addressService.createOne(address))
  } catch (e) {
    return next(e)
  }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await addressService.findAll())
  } catch (e) {
    return next(e)
  }
}

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await addressService.findOneById(req.params.id))
  } catch (e) {
    next(e)
  }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const update = req.body
    return res.json(await addressService.updateOne(id, update))
  } catch (e) {
    next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    return res.json(await addressService.deleteOne(id))
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
