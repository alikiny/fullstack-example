import mongoose, { Document, ObjectId, Schema } from 'mongoose'
import bcrypt from "bcryptjs"

import addressService from '../addresses/addressService'

export const SELLER = 'seller'
export const BUYER = 'buyer'
export const ADMIN = 'admin'
export const MODERATOR = 'moderator'
export type UserRole =
  | typeof SELLER
  | typeof BUYER
  | typeof ADMIN
  | typeof MODERATOR

export interface UserDocument extends Document {
  username: string
  firstname: string
  lastname: string
  password?: string
  googleId?: string
  stripeId?: string
  email: string
  phone: string
  address?: ObjectId[]
  role: UserRole
  image?: string
  confirmed: boolean
}

const userSchema = new Schema<UserDocument>({
  username: {
    type: String,
    required: [true, 'username cannot be empty'],
    unique: true,
  },
  firstname: {
    type: String,
    required: [true, 'firstname cannot be empty'],
  },
  lastname: {
    type: String,
    required: [true, 'lastname cannot be empty'],
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
    unique: true,
    sparse: true,
  },
  stripeId: {
    type: String,
    unique: true,
    sparse: true,
  },
  email: {
    type: String,
    unique: true,
    validate: {
      validator: function (value: string) {
        return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value)
      },
      message: (props: { value: string }) =>
        `${props.value} is not a valid email!`,
    },
    required: [true, 'Email cannot be empty'],
  },
  phone: {
    type: String,
    validate: {
      validator: function (value: string) {
        return value.length === 11
      },
      message: () =>
        'Phone number should be 11 digits. For example: \'0305754578\'',
    }
  },
  address: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Address'
    },
  ],
  role: {
    type: String,
    enum: [SELLER, BUYER, ADMIN, MODERATOR],
    required: [true, 'role cannot be empty'],
  },
  image: String,
  confirmed: {
    type: Boolean,
    required: true,
  },
})

userSchema.pre(
  'save',
  /** Hash the password when new user is created or when user updates password */
  async function (next) {
    try {
      if (this.isNew || this.isModified('password')) {
        if (this.password) {
          const hashedPassword = await bcrypt.hash(this.password, 10)
          this.password = hashedPassword
        }
      }
    } catch (e: any) {
      return next(e)
    }
    return next()
  }
)

/** Compare the plain password with encrypted password */
userSchema.methods.comparePassword = async function (password: string) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model<UserDocument>('User', userSchema)
export default User
