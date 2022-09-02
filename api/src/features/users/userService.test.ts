/* import connect, { MongodHelper } from '../../helpers/db-helper'
import userService from './userService'
import { listInsert, user4, user2, user3 } from './user.fixture'
import User from './User'
import { address4 } from '../addresses/address.fixture'
import { image1 } from '../images/image.fixture'
import Image from '../images/Image'
import Address from '../addresses/Address'

let mongodHelper: MongodHelper

beforeAll(async () => {
  mongodHelper = await connect()
})

beforeEach(async () => {
  await User.insertMany(listInsert)
})

afterEach(async () => {
  await mongodHelper.clearDatabase()
})

afterAll(async () => {
  await mongodHelper.closeDatabase()
})

describe('Test userService', () => {
  test('Should create new user', async () => {
    const createdUser = await userService.createOne({
      user: user4,
      address: address4,
      fullPath: '',
      image: image1,
    })
    expect((await Image.find()).length).toBe(1)
    expect(createdUser).toEqual(user4)
    expect(createdUser?.address).toContain(address4._id)
  })
  test('Should find all user with pagination', async () => {
    const users = await userService.findAll(0, 2, 'username')
    const usersPage1 = await userService.findAll(1, 2, 'lastname')
    expect(users[0].username).toEqual(user2.username)
    expect(users[0].password).toBeUndefined() //we have deselected the password in the find() query
    expect(users.length).toBe(2)
    expect(usersPage1.length).toBe(1)
    expect(usersPage1[0].firstname).toEqual(user3.firstname)
  })
  test('Should update one user', async () => {
    const updatedUser = await userService.updateOne(user2._id, {
      firstname: 'Larry',
      password: 'laryWil2345',
    })
    expect(updatedUser?.firstname).toEqual('Larry')
  })
  test('Should delete one user', async () => {
    await userService.deleteOne(user2._id)
    expect((await User.find()).length).toBe(2)
  })
})
 */