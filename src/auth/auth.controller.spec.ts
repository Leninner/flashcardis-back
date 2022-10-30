import { JwtModule } from '@nestjs/jwt'
import { Test, TestingModule } from '@nestjs/testing'
import { getTestingMongooseModuleImports } from '../test-utils/db-entities.utils'
import { UserModule } from '../users/users.module'
import { AuthController } from './auth.controller'
import { AuthModule } from './auth.module'

describe('AuthController', () => {
  let controller: AuthController

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        AuthModule,
        JwtModule,
        ...(await getTestingMongooseModuleImports()),
        UserModule,
      ],
    }).compile()

    controller = module.get<AuthController>(AuthController)
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
