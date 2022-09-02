import { Request, Response, NextFunction } from "express"
import { UnauthorizedError } from "../helpers/apiError"

const verifyUser = async (req: Request, res: Response, next: NextFunction) => {
    let user = req.user
    if (user) {
        return next()
    } else {
        return res.send("user not found")
    }
}
export default verifyUser