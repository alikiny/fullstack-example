import { NotFoundError } from '../../helpers/apiError'
import UserReview, { UserReviewDocument } from './UserReview'

const createOne = async (userReview: UserReviewDocument) => {
  const createdUserReview = await userReview.save()
  return createdUserReview
}

const findAll = async () => {
  return await UserReview.find().sort({ updatedAt: 1 })
}

const findOneById = async (id: string) => {
  const foundUserReview = await UserReview.findById(id)
  if (foundUserReview) {
    return foundUserReview
  } else {
    throw new NotFoundError()
  }
}

const updateOne = async (id: string, update: Partial<UserReviewDocument>) => {
  const foundUserReview = await UserReview.findByIdAndUpdate(id, update, {
    new: true,
  })
  if (foundUserReview) {
    return foundUserReview
  } else {
    throw new NotFoundError()
  }
}

const deleteOne = async (id: string) => {
  const deletedUserReview = await UserReview.findByIdAndDelete(id)
  if (deletedUserReview) {
    return deletedUserReview
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
