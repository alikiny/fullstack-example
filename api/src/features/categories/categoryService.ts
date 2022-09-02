import { NotFoundError } from '../../helpers/apiError'
import Category, { CategoryDocument } from './Category'

const createOne = async (category: CategoryDocument) => {
  const createdCategory = await category.save()
  return createdCategory
}

const findAll = async () => {
  return await Category.find().sort({ name: 1 })
}

const findOneById = async (id: string) => {
  const foundCategory = await Category.findById(id)
  if (foundCategory) {
    return foundCategory
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<CategoryDocument>) => {
  const foundCategory = await Category.findByIdAndUpdate(id, update, {
    new: true,
  })
  if (foundCategory) {
    return foundCategory
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const deletedCategory = await Category.findByIdAndDelete(id)
  if (deletedCategory) {
    return deletedCategory
  } else {
    throw new NotFoundError()
  }
}

export default {
  createOne,
  findAll,
  findOneById,
  updateOne,
  deleteOne,
}
