import { ObjectId } from 'mongoose'
import { NotFoundError } from '../../helpers/apiError'
import Cart, { CartDocument } from './Cart'

const createOne = async (cart: CartDocument) => {
  const createdCart = await cart.save()
  return createdCart
}

const findAll = async (page: number, limit: number, sort: string) => {
  return await Cart.find()
    .sort({ [sort]: 1 })
    .limit(limit)
    .skip(page * limit)
}

const findOneById = async (id: string) => {
  const foundCart = await Cart.findById(id)
  if (foundCart) {
    return foundCart
  } else {
    throw new NotFoundError()
  }
}

const findByUserId = async (userId: string) => {
  const foundCart = await Cart.findOne({
    userId: userId,
  })
  if (foundCart) {
    return foundCart
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<CartDocument>) => {
  const foundCart = await Cart.findByIdAndUpdate(id, update, {
    new: true,
  })
  if (foundCart) {
    return foundCart
  } else {
    throw new NotFoundError()
  }
}

/** This function is used in the transaction with deleteOne() in productService
 * Once a product is deleted from database, it will be deleted from the unpaid cart too
 */
const removeDeletedProduct = async (productId: string) => {
  return await Cart.updateMany(
    { status: 'unpaid' },
    {
      $pull: {
        products: {
          productId: productId,
        },
      },
    }
  )
}

const deleteOne = async (id: string) => {
  const deletedCart = await Cart.findByIdAndDelete(id)
  if (deletedCart) {
    return deletedCart
  } else {
    throw new NotFoundError()
  }
}

export default {
  createOne,
  findAll,
  findOneById,
  findByUserId,
  updateOne,
  deleteOne,
  removeDeletedProduct,
}
