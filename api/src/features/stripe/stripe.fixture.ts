import { StripeProduct } from './stripeService'
import { product1, product2, product3 } from '../products/product.fixture'

export const stripeProducts: StripeProduct[] = [
  {
    title: 'test product',
    price: 250,
    quantity: 3,
  },
  {
    title: 'test product',
    price: 50,
    quantity: 2,
  },
]
