export const NEW_CONDITION = 'NEW'
export const LIKENEW_CONDITION = 'LIKE NEW'
export const GOOD_CONDITION = 'GOOD'
export const FAIR_CONDITION = 'FAIR'
export type Condition =
    | typeof NEW_CONDITION
    | typeof LIKENEW_CONDITION
    | typeof GOOD_CONDITION
    | typeof FAIR_CONDITION

export interface Product{
    _id: string
    title: string
    description: string
    category: string[]
    condition: Condition
    price: number
    inStock: number
    delivery: boolean
    sellerId: string
    city: string
    reviews?: string[]
    rate?: number
}

export interface UpdateProductParams{
    _id: string,
    update: Partial<Product>
}

export interface FetchAllProductsQuery{
    categories: string[]
    cities: string[]
    page: number
    limit: number
    sort: number
}