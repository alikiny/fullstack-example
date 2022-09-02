import { NotFoundError } from '../../helpers/apiError'
import City, { CityDocument } from './City'

const createOne = async (city: CityDocument) => {
  const createdCity = await city.save()
  return createdCity
}

const findAll = async (
  sort: string = 'name',
  page?: number,
  limit?: number
) => {
  if (limit && page) {
    return await City.find()
      .sort({ [sort]: 1 })
      .limit(limit)
      .skip(page * limit)
  } else {
    return await City.find().sort({ [sort]: 1 })
  }
}

const findOneById = async (id: string) => {
  const foundCity = await City.findById(id)
  if (foundCity) {
    return foundCity
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<CityDocument>) => {
  const foundCity = await City.findByIdAndUpdate(id, update, {
    new: true,
  })
  if (foundCity) {
    return foundCity
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const deletedCity = await City.findByIdAndDelete(id)
  if (deletedCity) {
    return deletedCity
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
