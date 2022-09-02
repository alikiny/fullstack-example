export const SELLER = 'seller'
export const BUYER = 'buyer'
export const ADMIN = 'admin'
export const MODERATOR = 'moderator'
export type UserRole =
    | typeof SELLER
    | typeof BUYER
    | typeof ADMIN
    | typeof MODERATOR

export interface User {
    username: string
    firstname: string
    lastname: string
    password?: string
    googleId?: string
    stripeId?: string
    email: string
    phone: string
    address?: string[]
    role: UserRole
    image?: string
    confirmed: boolean
}