import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface ImageDocument extends Document {
  data: Buffer
  userId: ObjectId
  productId?: ObjectId
}

const imageSchema = new Schema({
  data: {
    type: Buffer,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
})

const Image = mongoose.model<ImageDocument>('Image', imageSchema)
export default Image
