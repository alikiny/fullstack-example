import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export type Rate = 1 | 2 | 3 | 4 | 5

export interface UserReviewDocument extends Document {
  reviewer: ObjectId
  reviewee: ObjectId
  productId: ObjectId
  rate: Rate
  content: string
}

const userReviewSchema = new Schema<UserReviewDocument>(
  {
    reviewer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    reviewee: {
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
    content: {
      type: String,
      required: [true, 'Content cannot be empty'],
    },
  },
  {
    timestamps: true,
  }
)

const UserReview = mongoose.model<UserReviewDocument>(
  'UserReview',
  userReviewSchema
)
export default UserReview
