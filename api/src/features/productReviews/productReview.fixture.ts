import { ObjectId } from 'mongodb'

import ProductReview from './ProductReview'
import { product1 } from '../products/product.fixture'

export const productReview1 = new ProductReview({
  userId: new ObjectId(),
  productId: product1._id,
  rate: 3,
  content: 'Product is fine',
})

export const productReview2 = new ProductReview({
  userId: new ObjectId(),
  productId: product1._id,
  rate: 2,
  content: 'Product is fine',
})

export const productReview3 = new ProductReview({
  userId: new ObjectId(),
  productId: product1._id,
  rate: 4,
  content: 'Product is good',
})

export const productReview4 = new ProductReview({
  userId: new ObjectId(),
  productId: product1._id,
  rate: 5,
  content: 'Product is good',
})
