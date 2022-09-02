import { NextFunction, Request, Response } from 'express'

import { ADMIN, MODERATOR } from '../features/users/User'
import { UnauthorizedError } from '../helpers/apiError'

const verifyAdminOrModerator = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.user?.role === ADMIN || req.user?.role === MODERATOR) {
      next()
    } else {
      throw new UnauthorizedError(
        'Only admin and moderator are allowed for this request'
      )
    }
  } catch (e) {
    return next(e)
  }
}

export default verifyAdminOrModerator
