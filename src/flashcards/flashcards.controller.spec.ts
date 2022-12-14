import { Test, TestingModule } from '@nestjs/testing'
import { FlashcardsController } from './flashcards.controller'
import { getTestingMongooseModuleImports } from '../test-utils/db-entities.utils'
import { FlashcardsModule } from './flashcards.module'

describe('FlashcardsController', () => {
  let module: TestingModule
  let controller: FlashcardsController

  beforeAll(async () => {
    module = await Test.createTestingModule({
      // eslint-disable-next-line no-extra-parens
      imports: [...(await getTestingMongooseModuleImports()), FlashcardsModule],
    }).compile()

    controller = module.get<FlashcardsController>(FlashcardsController)
  })

  afterAll(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
