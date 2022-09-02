import { NextFunction, Request, Response } from 'express'

import Address, { AddressDocument } from '../addresses/Address'
import { BadRequestError, UnauthorizedError } from '../../helpers/apiError'
import User from './User'
import Image from '../images/Image'
import userService from './userService'

const createOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fullPath = req.protocol + '://' + req.get('host')
    const {
      username,
      firstname,
      lastname,
      email,
      password,
      phone,
      role,
      name,
      city,
      country,
      line1,
      line2,
      postal_code,
      state,
    } = req.body as any
    const user = new User({
      username,
      firstname,
      lastname,
      email,
      password,
      phone,
      role,
    })
    await userService.checkUserUnique(user)
    const address = new Address({
      name,
      city,
      country,
      line1,
      line2,
      postal_code,
      state,
      userId: user._id,
    })
    const image = new Image({
      data: req.file?.buffer,
    })
    const newUser = await userService.createOne({
      user,
      address,
      image,
      fullPath,
    })
    return res.json(newUser)
  } catch (e) {
    return next(e)
  }
}

const findAll = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { limit, page, sort } = req.body
    return res.json(await userService.findAll(page, limit, sort))
  } catch (e) {
    return next(e)
  }
}

const confirmAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user
    const result = await userService.confirmAccount(user?._id)
    return res.send(result)
  } catch (e) {
    return next(e)
  }
}

const findOneById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    return res.json(await userService.findOneById(req.params.id))
  } catch (e) {
    return next(e)
  }
}

const updateOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const { firstname, lastname, username, email, phone, password } = req.body
    return res.json(
      await userService.updateOne(id, {
        firstname,
        lastname,
        username,
        email,
        phone,
        password,
      })
    )
  } catch (e: any) {
    return next(e)
  }
}

const deleteOne = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    return res.json(await userService.deleteOne(id))
  } catch (e) {
    next(e)
  }
}

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = req.user
    console.log("login: ", req.session.id)
    if (!user) {
      throw new UnauthorizedError()
    }
    return res.json(userService.createToken(user))

  } catch (e) {
    return next(e)
  }
}

export default {
  createOne,
  findAll,
  findOneById,
  updateOne,
  deleteOne,
  login,
  confirmAccount,
}
