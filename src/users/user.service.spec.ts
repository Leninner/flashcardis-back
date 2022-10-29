import { Test, TestingModule } from '@nestjs/testing'
import { getTestingMongooseModuleImports } from '../test-utils/db-entities.utils'
import { UserService } from './user.service'

describe('User Controller tests', () => {
  let service: UserService

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // eslint-disable-next-line no-extra-parens
      imports: [...(await getTestingMongooseModuleImports())],
      controllers: [UserService],
      providers: [UserService],
    }).compile()
    service = module.get<UserService>(UserService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
