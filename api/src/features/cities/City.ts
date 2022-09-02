import mongoose, { Schema, Document } from 'mongoose'

export interface CityDocument extends Document {
  name: string
}

const citySchema = new Schema<CityDocument>({
  name: {
    type: String,
    unique: true,
    required: true,
  },
})

const City = mongoose.model<CityDocument>('City', citySchema)
export default City
