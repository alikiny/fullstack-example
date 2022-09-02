import { NotFoundError } from '../../helpers/apiError'
import Image, { ImageDocument } from './Image'

const createOne = async (image: ImageDocument) => {
  return await image.save()
}

const findAll = async () => {
  return await Image.find().sort({ name: 1 })
}

const findOneById = async (id: string) => {
  const foundImage = await Image.findById(id)
  if (foundImage) {
    return foundImage
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<ImageDocument>) => {
  const foundImage = await Image.findByIdAndUpdate(id, update, {
    new: true,
  })
  if (foundImage) {
    return foundImage
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const deletedImage = await Image.findByIdAndDelete(id)
  if (deletedImage) {
    return deletedImage
  } else {
    throw new NotFoundError()
  }
}
const deleteByUserId = async (id: string) => {
  await Image.deleteMany({ userId: id })
}

const deleteAll = async (userId: string) => {
  return await Image.deleteMany({ userId: userId })
}

export default {
  createOne,
  findAll,
  findOneById,
  updateOne,
  deleteOne,
  deleteAll,
  deleteByUserId,
}
