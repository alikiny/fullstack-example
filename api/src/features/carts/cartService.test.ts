import Cart from './Cart'
import cartService from './cartService'
import connect, { MongodHelper } from '../../helpers/db-helper'
import { cart1, cart2, cart3 } from './cart.fixture'
import { product1 } from '../products/product.fixture'

let mongodHelper: MongodHelper

beforeAll(async () => {
  mongodHelper = await connect()
})

beforeEach(async () => {
  await Cart.insertMany([cart1, cart2, cart3])
})

afterEach(async () => {
  await mongodHelper.clearDatabase()
})

describe('Test cartService', () => {
  test('Should remove the deleted product from all unpaid cart', async () => {
    await cartService.removeDeletedProduct(product1._id)
    expect((await Cart.findOne({ status: 'unpaid' }))?.products.length).toBe(1)
  })
})
