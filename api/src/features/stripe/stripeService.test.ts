/* import stripeService from './stripeService'
import { stripeProducts } from './stripe.fixture'

beforeEach(async () => {
  await stripeService.deleteAllCustomer()
})

describe('Test stripeService', () => {
  test('Check out a payment', async () => {
    const customer = await stripeService.createCustomer(
      'testter@gmail.com',
      '0348934543',
      'Tester',
      {
        city: 'Espoo',
        line1: 'espoontie 1',
      }
    )
    const checkout = await stripeService.checkoutSession(
      customer.id,
      stripeProducts
    )
    expect(checkout?.amount_total).toBe(850000)
  })
})
 */