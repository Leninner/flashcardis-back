// eslint-disable-next-line @typescript-eslint/no-var-requires
import { ObjectId } from 'mongodb'

module.exports = [
  {
    _id: new ObjectId(),
    email: 'mathias@tinkin.one',
    password: '123456',
    userName: 'mathilu',
    roles: ['ADMIN'],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]
