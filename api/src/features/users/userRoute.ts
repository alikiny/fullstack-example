import { Router } from 'express'
import passport from 'passport'
import { singleUpload } from '../../middlewares/fileUpload'
import verifyAccount from '../../middlewares/verifyAccount'
import verifyToken from '../../middlewares/verifyToken'
import verifyUser from '../../middlewares/verifyUser'
import userController from './userController'

const userRoute = Router()
//option 1: use "session" to authenticate user
userRoute.get('', verifyUser, userController.findAll)

userRoute.get('/:id', userController.findOneById)
userRoute.get('/confirm/:token', verifyToken, userController.confirmAccount)
userRoute.post('', singleUpload, userController.createOne)
userRoute.patch('/:id', singleUpload, userController.updateOne)
userRoute.delete('', userController.deleteOne)
userRoute.post(
  '/auth/google',
  passport.authenticate('google-id-token'),
  userController.login
)
userRoute.post('/logout', function (req, res, next) {
  req.logout(function (err) {
    if (err) { return next(err); }
    return res.redirect("http://localhost:3000");
  });
});

userRoute.post('/auth/account', verifyAccount, userController.login)

export default userRoute
