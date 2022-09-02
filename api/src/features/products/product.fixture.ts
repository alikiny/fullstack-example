import { ObjectId } from 'mongodb'

import Product from './Product'
import {
  category1,
  category2,
  category3,
  category4,
} from '../categories/category.fixture'
import { Espoo, Helsinki, Vantaa } from '../cities/city.fixture'

export const product1 = new Product({
  title: 'Table',
  description: 'Wooden table for sale',
  category: [category1._id],
  condition: 'NEW',
  price: 23,
  inStock: 2,
  delivery: true,
  sellerId: new ObjectId(),
  city: Espoo._id,
})

export const product2 = new Product({
  title: 'Ipad air 3 gen',
  description: 'Good ipad air for sale',
  category: [category3._id, category4._id],
  condition: 'LIKE NEW',
  price: 250,
  inStock: 1,
  delivery: false,
  sellerId: new ObjectId(),
  city: Espoo._id,
})

export const product3 = new Product({
  title: 'Running shoes for kids',
  description: 'Adidas shoes size 27',
  category: [category2._id, category4._id],
  condition: 'FAIR',
  price: 12,
  inStock: 1,
  delivery: true,
  sellerId: new ObjectId(),
  city: Helsinki._id,
})

export const product4 = new Product({
  title: 'Solar lamp',
  description: 'Beautiful lamp for garden',
  category: [category3._id, category4._id, category1._id],
  condition: 'GOOD',
  price: 15,
  inStock: 3,
  delivery: false,
  sellerId: new ObjectId(),
  city: Vantaa._id,
})
