import { NextFunction, Request, Response } from 'express'
import UserReview from './UserReview'
import userReviewService from './userReviewService'

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userReview = new UserReview(req.body.userReview)
    return res.json(await userReviewService.createOne(userReview))
  } catch (e) {
    return next(e)
  }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await userReviewService.findAll())
  } catch (e) {
    return next(e)
  }
}

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await userReviewService.findOneById(req.params.id))
  } catch (e) {
    next(e)
  }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const update = req.body
    return res.json(await userReviewService.updateOne(id, update))
  } catch (e) {
    next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    return res.json(await userReviewService.deleteOne(id))
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
