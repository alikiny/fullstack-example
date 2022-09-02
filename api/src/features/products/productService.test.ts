import Product from './Product'
import ProductReview from '../productReviews/ProductReview'
import productReviewService from '../productReviews/productReviewService'
import productService from './productService'
import connect, { MongodHelper } from '../../helpers/db-helper'
import { category4, category1 } from '../categories/category.fixture'
import { Espoo } from '../cities/city.fixture'
import { product1, product2, product3, product4 } from './product.fixture'
import {
  productReview1,
  productReview2,
  productReview3,
  productReview4,
} from '../productReviews/productReview.fixture'

let mongodHelper: MongodHelper

beforeAll(async () => {
  mongodHelper = await connect()
})

beforeEach(async () => {
  await Product.insertMany([product1, product2, product3])

  //Add 3 reviews object to the ProductReview. These reviews are all pointed to product1
  await ProductReview.insertMany([
    productReview1,
    productReview2,
    productReview3,
  ])
})

afterEach(async () => {
  await mongodHelper.clearDatabase()
})

afterAll(async () => {
  await mongodHelper.closeDatabase()
})

describe('Test productService', () => {
/*   test('Add new product', async () => {
    await productService.createOne(product4)
    expect((await Product.find()).length).toBe(4)
  }) */
  test('Find products by filter', async () => {
    /* Test 1: only pass the categoryId. This should filter 
        only on categoryId */
    const products1 = await productService.findByFilter([category4._id])
    expect(products1.length).toBe(2)

    /* Test 2: pass categoryId and cityId. Should filter on categoryId and cityId*/
    const products2 = await productService.findByFilter(
      [category4._id],
      [Espoo._id]
    )
    expect(products2.length).toBe(1)
  })
  test('Find product by id', async () => {
    const foundProduct = await productService.findOneById(product1._id)
    expect(foundProduct).toBeDefined()
  })
  test('Get all products with pagination', async () => {
    const products = await productService.findAll(0, 3, 'title')
    /* If sorted accurately, new order would be product2, product3, product1
        We are checking the following criteria:
        - Length is as expected (3 products returned as limit is 3)
        - Sorted in title asc, which should bring product2 at first
        - All reviews are correctly looked up from ProductReview, which means
        product1 should have 3 reviews
        - New 'rate' field is added, as the average of individual rate in each review */
    expect(products.length).toBe(3)
    expect(products[0].title).toBe(product2.title)
    expect(products[2].reviews.length).toBe(3)
    expect(products[2].rate).toBe(3)
  })
  test('Delete one product', async () => {
    await productService.deleteOne(product1._id)
    expect((await Product.find()).length).toBe(2)
    expect(
      (await productReviewService.findProductReviews(product1._id)).length
    ).toBe(0)
  })
})
