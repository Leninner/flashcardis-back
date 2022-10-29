import { Test, TestingModule } from '@nestjs/testing'
import { getTestingMongooseModuleImports } from '../test-utils/db-entities.utils'
import { UserController } from './user.controller'
import { UserModule } from './users.module'

describe('User Controller tests', () => {
  let module: TestingModule
  let controller: UserController

  beforeAll(async () => {
    module = await Test.createTestingModule({
      // eslint-disable-next-line no-extra-parens
      imports: [...(await getTestingMongooseModuleImports()), UserModule],
    }).compile()
    controller = module.get<UserController>(UserController)
  })

  afterAll(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
