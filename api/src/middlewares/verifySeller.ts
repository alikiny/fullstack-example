import { NextFunction, Request, Response } from 'express'
import { UnauthorizedError } from '../helpers/apiError'

import { SELLER } from '../features/users/User'

const verifyAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user?.role === SELLER) {
      next()
    } else {
      throw new UnauthorizedError('Only seller is allowed for this request')
    }
  } catch (e) {
    return next(e)
  }
}

export default verifyAdmin
