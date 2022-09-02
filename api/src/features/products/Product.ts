import mongoose, { Document, Model, ObjectId, Schema } from "mongoose"

export const NEW_CONDITION = "NEW"
export const LIKENEW_CONDITION = "LIKE NEW"
export const GOOD_CONDITION = "GOOD"
export const FAIR_CONDITION = "FAIR"
export type Condition =
  | typeof NEW_CONDITION
  | typeof LIKENEW_CONDITION
  | typeof GOOD_CONDITION
  | typeof FAIR_CONDITION

export interface ProductDocument extends Document {
  title: string
  description: string
  category: ObjectId[]
  condition: Condition
  price: number
  inStock: number
  delivery: boolean
  sellerId: ObjectId
  city: ObjectId
  reviews?: ObjectId[]
  rate?: number,
  images: string[]
}

const productSchema = new Schema<ProductDocument>(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    category: [
      {
        type: Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    condition: {
      type: String,
      enum: [NEW_CONDITION, LIKENEW_CONDITION, GOOD_CONDITION, FAIR_CONDITION],
    },
    price: {
      type: Number,
      required: [true, "Price cannot be empty"],
    },
    inStock: {
      type: Number,
      required: [true, "inStock cannot be empty"],
    },
    delivery: {
      type: Boolean,
      required: [true, "delivery cannot be empty"],
    },
    sellerId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Price cannot be empty"],
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: "City",
      required: [true, "City cannot be empty"],
    },
    images: Array
  },
  /* Add extra configuration to productSchema to allow virtual path to be included into the
    actual document when calling populate() method */
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
  }
)

productSchema.virtual("reviews", {
  ref: "ProductReview",
  localField: "_id",
  foreignField: "productId",
})

const Product = mongoose.model<ProductDocument>("Product", productSchema)
export default Product
