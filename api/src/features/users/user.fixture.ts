import User from './User'

export const user4 = new User({
  firstname: 'Alia',
  lastname: 'Nguyen',
  username: 'alikiny',
  email: 'trangkiny@gmail.com',
  password: 'aliaNguyen143',
  phone: '04556434561',
  address: [],
  role: 'buyer',
  confirmed: true
})

export const user1 = new User({
  firstname: 'Diana',
  lastname: 'Henberge',
  username: 'diana',
  email: 'dia@gmail.com',
  password: 'dianHen43',
  phone: '09556367382',
  address: [],
  role: 'buyer',
  confirmed: true
})

export const user2 = new User({
  firstname: 'Cindy',
  lastname: 'Luu',
  username: 'Cindu',
  email: 'cindy.luu@gmail.com',
  password: 'cindyLuu67',
  phone: '03725777473',
  address: [],
  role: 'buyer',
  confirmed: true
})

export const user3 = new User({
  firstname: 'Elly',
  lastname: 'William',
  username: 'elly',
  email: 'elly@gmail.com',
  password: 'elWiam689',
  phone: '09227832235',
  address: [],
  role: 'seller',
  confirmed: true
})

export const listInsert = [user1, user2, user3]
