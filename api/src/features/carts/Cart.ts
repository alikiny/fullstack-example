import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export const PAID = 'paid'
export const UNPAID = 'unpaid'
export const PENDING = 'pending'
type PAYMENT_STATUS = typeof PAID | typeof UNPAID | typeof PENDING

export interface CartDocument extends Document {
  products: {
    productId: ObjectId
    quantity: number
  }[]
  userId: ObjectId
  status: PAYMENT_STATUS
}

const cartSchema = new Schema<CartDocument>({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  products: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: 'Product',
      },
      quantity: Number,
    },
  ],
  status: {
    type: String,
    enum: [PAID, UNPAID, PENDING],
    required: true
  },
})

const Cart = mongoose.model<CartDocument>('Cart', cartSchema)
export default Cart
