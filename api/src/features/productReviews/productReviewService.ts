import { ObjectId } from 'mongoose'
import { NotFoundError } from '../../helpers/apiError'
import ProductReview, { ProductReviewDocument } from './ProductReview'

const createOne = async (productReview: ProductReviewDocument) => {
  return await productReview.save()
}

const findAll = async () => {
  return await ProductReview.find().sort({ updatedAt: 1 })
}

const findOneById = async (id: string) => {
  const foundProductReview = await ProductReview.findById(id)
  if (foundProductReview) {
    return foundProductReview
  } else {
    throw new NotFoundError()
  }
}

const findProductReviews = async (productId: ObjectId) => {
  return await ProductReview.find({ productId: productId })
}

const updateOne = async (
  id: string,
  update: Partial<ProductReviewDocument>
) => {
  const foundProductReview = await ProductReview.findByIdAndUpdate(id, update, {
    new: true,
  })
  if (foundProductReview) {
    return foundProductReview
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const deletedProductReview = await ProductReview.findByIdAndDelete(id)
  if (deletedProductReview) {
    return deletedProductReview
  } else {
    throw new NotFoundError()
  }
}

/** Delete all the productReviews belong to a specific productId*/
const deleteAll = async (id: string) => {
  return await ProductReview.deleteMany({ productId: id })
}

export default {
  createOne,
  findAll,
  findOneById,
  findProductReviews,
  updateOne,
  deleteOne,
  deleteAll,
}
