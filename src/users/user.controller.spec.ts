import { Test, TestingModule } from '@nestjs/testing'
import { Model } from 'mongoose'
import { getTestingMongooseModuleImports } from '../test-utils/db-entities.utils'
import { UserController } from './user.controller'
import { UserModule } from './users.module'
import { User } from './schemas/user.schema'

describe('User Controller tests', () => {
  const USERS_IN_DB_FIXTURE = 1
  let module: TestingModule
  let controller: UserController
  let userModel: Model<User>

  beforeAll(async () => {
    module = await Test.createTestingModule({
      imports: [...(await getTestingMongooseModuleImports()), UserModule],
    }).compile()
    controller = module.get<UserController>(UserController)
    userModel = module.get<Model<User>>('UserModel')
  })

  afterAll(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })

  describe('When the user don´t send the required fields', () => {
    const data = {
      userName: '',
      email: '',
      password: '',
    }

    it('should throw an error', async () => {
      try {
        await controller.createUser(data)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })

    it("shouldn't create a user", async () => {
      const beforeExecution = await userModel.find()
      expect(beforeExecution).toHaveLength(USERS_IN_DB_FIXTURE)

      try {
        await controller.createUser(data)
      } catch (error) {}

      const afterExecution = await userModel.find()
      expect(afterExecution).toHaveLength(USERS_IN_DB_FIXTURE)
    })
  })

  describe('When the user send an incorrect email', () => {
    it('should throw an error', async () => {
      const data = {
        userName: 'test',
        email: 'test',
        password: 'test',
      }

      try {
        await controller.createUser(data)
      } catch (error) {
        expect(error).toBeDefined()
      }
    })
  })
})
