import { NotFoundError } from '../../helpers/apiError'
import Address, { AddressDocument } from './Address'

const createOne = async (address: AddressDocument) => {
  const createdAddress = await address.save()
  return createdAddress
}

const findAll = async () => {
  return await Address.find().sort({ name: 1 })
}

const findOneById = async (id: string) => {
  const foundAddress = await Address.findById(id)
  if (foundAddress) {
    return foundAddress
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<AddressDocument>) => {
  const foundAddress = await Address.findByIdAndUpdate(id, update, {
    new: true,
  })
  if (foundAddress) {
    return foundAddress
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const deletedAddress = await Address.findByIdAndDelete(id)
  if (deletedAddress) {
    return deletedAddress
  } else {
    throw new NotFoundError()
  }
}

const deleteAll = async (userId: string) => {
  return await Address.deleteMany({ userId: userId })
}

export default {
  createOne,
  findAll,
  findOneById,
  updateOne,
  deleteOne,
  deleteAll,
}
