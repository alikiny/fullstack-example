import mongoose, { ObjectId } from 'mongoose'
import { NotFoundError, TransactionError } from '../../helpers/apiError'
import Product, { ProductDocument } from './Product'
import cartService from '../carts/cartService'
import productReviewService from '../productReviews/productReviewService'
import { ImageDocument } from '../images/Image'

const createOne = async (product: ProductDocument, images: ImageDocument[]) => {
  try {
    const session = await mongoose.startSession()
    let createdProduct
    await session.withTransaction(async () => {
      images.forEach(async (image) => {
        await image.save({ session: session })
        product.images.push(image._id)
      })
      createdProduct = await product.save({ session: session })
    })
    return createdProduct
  } catch (e:any) {
    throw new TransactionError(e.message)
  }
}

/* const findAll = async (page: number, limit: number, sort: string) => {
    return await Product.find()
        .sort({ [sort]: 1 })
        .limit(limit)
        .skip(page * limit)
} */

const findAggregation = (page: number, limit: number, sort: string) => {
  return Product.aggregate()
    .sort({ [sort]: 1 }) // sort the products based on chosedn field. Have to put in square bracket [sort] to produce right result
    .limit(limit)
    .skip(page * limit)
    .lookup({
      from: 'productreviews',
      localField: '_id',
      foreignField: 'productId',
      as: 'reviews',
    }) // same as populate(), but populate() cannot work in aggregation pipeline
    .addFields({
      rate: {
        $ifNull: [{ $avg: '$reviews.rate' }, 0],
      },
    }) // add new field 'rate' into each document, as the average of single rate from each review
}

const findAll = async (
  page: number = 0,
  limit: number = 10,
  sort: string = 'title'
) => {
  return await findAggregation(page, limit, sort)
}

const findOneById = async (
  id: string,
  page: number = 0,
  limit: number = 10,
  sort: string = 'title'
) => {
  /*     const foundProduct = await Product.findById(id)
        if (foundProduct) {
            return foundProduct
        } else {
            throw new NotFoundError()
        } */
  const foundProduct = await findAggregation(page, limit, sort).match({
    _id: id,
  })
  return foundProduct[0]
}

/** This function allows to filter documents on arrays of categories and array of cities */
const findByFilter = async (
  categories?: string[],
  cities?: string[],
  page: number = 0,
  limit: number = 10,
  sort: string = 'title'
) => {
  //create an array of conditions to match the aggregation pipline
  /* if categoryId and cityId is provided, set filter conditions accordingly
    otherwise, set condition as {$exists:true} to return all the documents */

  const filterArray = []
  categories?.length && categories.length > 0
    ? filterArray.push({
        category: {
          $in: categories,
        },
      })
    : filterArray.push({ category: { $exists: true } })
  cities?.length && cities.length > 0
    ? filterArray.push({
        city: {
          $in: cities,
        },
      })
    : filterArray.push({ city: { $exists: true } })

  /* matching filters category and city dynamically based on the values of arguments */
  return await findAggregation(page, limit, sort)
    .match({
      category: filterArray[0].category,
    })
    .match({
      city: filterArray[1].city,
    })
}

const updateOne = async (id: string, update: Partial<ProductDocument>) => {
  const foundProduct = await Product.findByIdAndUpdate(id, update, {
    new: true,
    runValidators: true,
  })
  if (foundProduct) {
    return foundProduct
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  try {
    const session = await mongoose.startSession()
    await session.withTransaction(async () => {
      const deletedProduct = await Product.findByIdAndDelete(id)
      if (deletedProduct) {
        await productReviewService.deleteAll(id)
        await cartService.removeDeletedProduct(id)
        return deletedProduct
      } else {
        throw new NotFoundError()
      }
    })
  } catch (e) {
    throw e
  }
}

export default {
  createOne,
  findAll,
  findOneById,
  findByFilter,
  updateOne,
  deleteOne,
}
