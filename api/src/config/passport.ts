import GoogleTokenStrategy from 'passport-google-id-token'
import JwtStrategy, { ExtractJwt } from 'passport-jwt'
import passport from 'passport'

import User, { UserDocument } from '../features/users/User'
import {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  JWT_SECRET,
} from '../util/secrets'
import { UnauthorizedError } from '../helpers/apiError'
import userService from '../features/users/userService'

/** Verify id_token sent from client (behind the scene). Using same clientid to verify
 * make sure clientId is same as the frontend clientId
*/
export const googleStrategy = new GoogleTokenStrategy(
  {
    clientID: GOOGLE_CLIENT_ID,
  },
  /** only activated once the id_token sent from the client is verifed */
  async function (parsedToken, googleId, cb) {
    //check if user exists in database
    const payload = parsedToken.payload
    /* check if user exist, then call cb(null, user) 
    if user does not exit, create user based on google pro payload, then call cb (null, user)*/
    const user = await User.findOne({ email: payload.email })
    if (user) {
      cb(null, user)
    }
    else {
      const newUser = new User({
        username: payload.name,
        firstname: payload.given_name,
        lastname: payload.family_name,
        email: payload.email,
        role: "buyer",
        image: payload.picture,
        confirmed: true,
        googleId: googleId
      })
      await newUser.save()
      /** cb set 2 params for req. first is req.error, second is req.user */
      cb(null, newUser)
    }
  }
)

export const jwtStrategy = new JwtStrategy.Strategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET,
  },
  async (jwt_payload, done) => {
    try {
      const user = await userService.findOneById(jwt_payload.data._id)
      return done(null, user)
    } catch (e) {
      return done(e, null)
    }
  }
)
