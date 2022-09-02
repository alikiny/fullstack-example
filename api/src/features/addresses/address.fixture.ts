import Address from './Address'
import { user1, user2, user3, user4 } from '../users/user.fixture'

export const address1 = new Address({
  name: 'home',
  city: 'Espoo',
  country: 'Finland',
  line1: 'Kirtintie',
  line2: '',
  postal_code: '02760',
  state: 'Espoo',
  userId: user1._id,
})

export const address2 = new Address({
  name: 'company',
  city: 'Espoo',
  country: 'Finland',
  line1: 'Kalintu',
  line2: '',
  postal_code: '02760',
  state: 'Espoo',
  userId: user2._id,
})

export const address3 = new Address({
  name: 'home',
  city: 'Espoo',
  country: 'Finland',
  line1: 'Sokinvuoentie',
  line2: '',
  postal_code: '02760',
  state: 'Espoo',
  userId: user3._id,
})

export const address4 = new Address({
  name: 'home',
  city: 'Espoo',
  country: 'Finland',
  line1: 'Haama',
  line2: '',
  postal_code: '02760',
  state: 'Espoo',
  userId: user4._id,
})
