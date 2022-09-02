import Cart, { CartDocument } from './Cart'
import { product1, product2 } from '../products/product.fixture'
import { user1, user2 } from '../users/user.fixture'

export const cart1: CartDocument = new Cart({
  products: [
    {
      productId: product1._id,
      quantity: 1,
    },
    {
      productId: product2._id,
      quantity: 2,
    },
  ],
  userId: user1._id,
  status: 'unpaid',
})

export const cart2: CartDocument = new Cart({
  products: [
    {
      productId: product1._id,
      quantity: 3,
    },
    {
      productId: product2._id,
      quantity: 1,
    },
  ],
  userId: user2._id,
  status: 'unpaid',
})

export const cart3: CartDocument = new Cart({
  products: [
    {
      productId: product1._id,
      quantity: 2,
    },
    {
      productId: product2._id,
      quantity: 1,
    },
  ],
  userId: user2._id,
  status: 'paid',
})
