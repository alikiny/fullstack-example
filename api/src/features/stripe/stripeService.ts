import Stripe from 'stripe'

const stripe = new Stripe(process.env.STRIPE_API_SECRET_TEST || '', {
  apiVersion: '2022-08-01',
  typescript: true,
})

const createCustomer = async (
  email: string,
  phone: string,
  name: string,
  address: Stripe.AddressParam
) => {
  return await stripe.customers.create({ email, phone, name, address })
}

const deleteAllCustomer = async () => {
  const customers = (await stripe.customers.list()).data
  customers.forEach((element) => {
    stripe.customers.del(element.id)
  })
}

const checkoutSession = async (
  customerId: string,
  products: StripeProduct[]
) => {
  try {
    const line_items: Stripe.Checkout.SessionCreateParams.LineItem[] =
      products.map((item) => {
        return {
          price_data: {
            currency: 'eur',
            product_data: {
              name: '' + item.title,
            },
            unit_amount: item.price * 1000,
          },
          quantity: item.quantity,
        }
      })
    return await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: 'payment',
      customer: customerId,
      success_url: 'https://stripe.com/docs/api/checkout/sessions/create',
      cancel_url: 'https://stripe.com/docs/api/checkout/sessions/create',
    })
  } catch (e:any) {
    throw new Error(e.message)
  }
}

export interface StripeProduct {
  title: string
  price: number
  quantity: number
}

export default {
  createCustomer,
  checkoutSession,
  deleteAllCustomer,
}
