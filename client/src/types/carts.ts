export const PAID = 'paid'
export const UNPAID = 'unpaid'
export const PENDING = 'pending'
type PAYMENT_STATUS = typeof PAID | typeof UNPAID | typeof PENDING

export interface Cart{
    products: {
        productId: string
        quantity: number
    }[]
    userId: string
    status: PAYMENT_STATUS
}
