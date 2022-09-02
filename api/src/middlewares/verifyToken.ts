import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import userService from '../features/users/userService'
import ApiError, { InvalidToken, NotFoundError } from '../helpers/apiError'
import { JWT_SECRET } from '../util/secrets'

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const { token } = req.params
  try {
    const { userId } = jwt.verify(token, JWT_SECRET) as any
    req.user = await userService.findOneById(userId)
    return next()
  } catch (e) {
    if (e instanceof ApiError) {
      return next(e)
    }
    return next(new InvalidToken())
  }
}

export default verifyToken
