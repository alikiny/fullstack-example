import { NextFunction, Request, Response } from 'express'
import userService from '../features/users/userService'

const verifyAccount = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { username, password } = req.body
    req.user = await userService.findOneByAccount(username, password)
    next()
  } catch (e) {
    return next(e)
  }
}

export default verifyAccount
