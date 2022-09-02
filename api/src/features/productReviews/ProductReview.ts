import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export type Rate = 1 | 2 | 3 | 4 | 5

export interface ProductReviewDocument extends Document {
  userId: ObjectId
  productId: ObjectId
  rate: Rate
  content: string
}

const productReviewSchema = new Schema<ProductReviewDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
    },
    rate: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    content: String,
  },
  {
    timestamps: true,
  }
)

const ProductReview = mongoose.model<ProductReviewDocument>(
  'ProductReview',
  productReviewSchema
)
export default ProductReview
