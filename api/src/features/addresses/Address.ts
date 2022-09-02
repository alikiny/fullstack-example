import mongoose, { Document, ObjectId, Schema } from 'mongoose'

export interface AddressDocument extends Document {
  name: string
  city: string
  country: string
  line1: string
  line2?: string
  postal_code: string
  state: string
  userId: ObjectId
}

const addressSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
  line1: {
    type: String,
    required: true,
  },
  line2: {
    type: String,
  },
  postal_code: {
    type: String,
    required: true,
  },
  state: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
})

const Address = mongoose.model<AddressDocument>('Address', addressSchema)
export default Address
