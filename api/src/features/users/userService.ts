import jwt from 'jsonwebtoken'
import mongoose from 'mongoose'
import Stripe from 'stripe'

import {
  DuplicateError,
  ForbiddenError,
  InvalidToken,
  NotFoundError,
  TransactionError,
  UnauthorizedError
} from '../../helpers/apiError'
import Address, { AddressDocument } from '../addresses/Address'
import Cart from '../carts/Cart'
import User, { UserDocument } from './User'
import { JWT_SECRET } from '../../util/secrets'
import addressService from '../addresses/addressService'
import mailService from '../mails/mailService'
import stripeService from '../stripe/stripeService'
import { ImageDocument } from '../images/Image'
import imageService from '../images/imageService'

const createToken = (user: Partial<UserDocument>) => {
  const token = jwt.sign(
    {
      data: user,
    },
    JWT_SECRET,
    { expiresIn: '30 days' }
  )
  return token
}

const createTempToken = (userId: string, expiresIn: string) => {
  try {
    const token = jwt.sign({ userId: userId }, JWT_SECRET, {
      expiresIn: expiresIn,
    })
    return token
  } catch (e) {
    throw new InvalidToken()
  }
}

const createOne = async ({
  user,
  address,
  image,
  fullPath,
}: CreateUserParams) => {
  const session = await mongoose.startSession()
  try {
    await session.withTransaction(async () => {
      if (address) {
        if (user._id !== address.userId) {
          throw new ForbiddenError('address does not belong to user')
        }
        const newAddress = await address.save({ session: session })
        const { city, country, state, line1, line2 } = address
        const addressPrams: Stripe.AddressParam = {
          city,
          country,
          state,
          line1,
          line2,
        }
        const newStripeCustomer = await stripeService.createCustomer(
          user.email,
          user.phone,
          user.username,
          addressPrams
        )
        user.stripeId = newStripeCustomer.id
        user.address?.push(newAddress._id)
      }
      if (image) {
        image.userId = user._id
        const savedImage = await image.save({ session: session })
        user.image = `${fullPath}/api/v1/images/${savedImage._id}`
      }
      user.confirmed = false
      const token = createTempToken(String(user._id), '1h')
      const confirmLink = `${fullPath}/users/confirm/${token}`
      await mailService.sendGreetingEmail(user.email, confirmLink)
      const cart = new Cart({ userId: user._id, status: "unpaid" })
      await cart.save({ session: session })
      return await user.save()
    })
    return user
  } catch (e: any) {
    throw new TransactionError(e.message)
  }
}

const findAll = async (
  page: number = 0,
  limit: number = 20,
  sort: string = 'firstname'
) => {
  return await User.find()
    .select('-password')
    .sort({ [sort]: 1 })
    .limit(limit)
    .skip(page * limit)
    .select('-password -stripeId -googleId')
}

const loginGoogle = async (user: UserDocument) => {
  const foundOne = await User.findOne({
    googleId: user.googleId,
  })
  if (foundOne) {
    return foundOne
  } else {
    user.confirmed = true
    return await user.save()
  }
}

const findOneById = async (id: string) => {
  const foundUser = await User.findById(id).select(
    '-password -stripeId -googleId'
  )
  if (foundUser) {
    return foundUser
  } else {
    throw new NotFoundError()
  }
}

const findOneByAccount = async (username: string, password: string) => {
  const foundUser = await User.findOne({
    username: username,
    password: password,
  })
  if (foundUser) {
    return foundUser
  } else {
    throw new UnauthorizedError()
  }
}

const findByText = async (text: string) => {
  const foundUser = await User.find({
    $or: [{ email: text }, { username: text }],
  }).select('-password -stripeId -googleId')
  return foundUser
}

const updateOne = async (id: string, update: Partial<UserDocument>) => {
    const foundUser = await User.findByIdAndUpdate(id, update, {
      new: true,
      runValidators: true,
    }).select('-password -stripeId -googleId')
    if (foundUser) {
      return foundUser
    } else {
      throw new NotFoundError()
    }
}

const confirmAccount = async (id: string) => {
  const foundUser = await User.findByIdAndUpdate(
    id,
    {
      confirmed: true,
    },
    {
      new: true,
    }
  ).select('-password -stripeId -googleId')
  if (foundUser) {
    return foundUser
  } else {
    throw new NotFoundError()
  }
}

/** Check the uniqueness of user information before creating or updating */
const checkUserUnique = async (user: UserDocument) => {
  if (await User.findOne({ username: user.username })) {
    throw new DuplicateError('username is already taken')
  }
  if (await User.findOne({ email: user.email })) {
    throw new DuplicateError('email is already taken')
  }
  if (await User.findOne({ phone: user.phone })) {
    throw new DuplicateError('phone is already taken')
  }
}

/**This function is a transaction, which deletes user from User, addresses of user from
 * Address, and carts of user from Cart
 */
const deleteOne = async (id: string) => {
  try {
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      const deletedUser = await User.findByIdAndDelete(id)
      if (!deletedUser) {
        throw new NotFoundError()
      }
      await addressService.deleteAll(id)
      await Cart.deleteMany({ userId: id })
      await imageService.deleteByUserId(id)
    })
  } catch (e: any) {
    throw new TransactionError(e)
  }
}

interface CreateUserParams {
  user: UserDocument
  address?: AddressDocument
  image?: ImageDocument
  fullPath?: string
}

export default {
  createOne,
  findAll,
  findOneById,
  findByText,
  findOneByAccount,
  updateOne,
  deleteOne,
  createToken,
  checkUserUnique,
  confirmAccount,
  loginGoogle,
}
