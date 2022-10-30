import { Test, TestingModule } from '@nestjs/testing'
import { getTestingMongooseModuleImports } from '../test-utils/db-entities.utils'
import { UserService } from './user.service'
import { UserModule } from './users.module'

describe('User Controller tests', () => {
  let service: UserService
  // let userModel: Model<User>

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...(await getTestingMongooseModuleImports()), UserModule],
    }).compile()
    service = module.get<UserService>(UserService)
    // userModel = module.get<Model<User>>('UserModel')
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('When the create method is called', () => {
    const defaultData = {
      userName: 'leninner21',
      email: 'lenin@tinkin.one',
      password: '123456',
    }

    it('with the correct params, should create a user', async () => {
      const result = await service.create(defaultData)

      expect(result.email).toBe(defaultData.email)
    })

    it('with a duplicated email, should throw an error', async () => {
      const data = {
        userName: 'test',
        email: 'lenin@tinkin.one',
        password: '123456',
      }

      try {
        await service.create(data)
      } catch (error) {
        expect(error.message).toBe(
          'User with the same email or username already exists',
        )
      }
    })

    it('with a duplicated userName, should throw an error', async () => {
      const data = {
        userName: 'test',
        email: 'hi@tinkin.one',
        password: '123456',
      }

      try {
        await service.create(data)
      } catch (error) {
        expect(error.message).toBe(
          'User with the same email or username already exists',
        )
      }
    })
  })
})
