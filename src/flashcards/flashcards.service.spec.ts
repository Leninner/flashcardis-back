import { Test, TestingModule } from '@nestjs/testing'
import { FlashcardsService } from './flashcards.service'
import { getTestingMongooseModuleImports } from '../test-utils/db-entities.utils'
import { FlashcardsModule } from './flashcards.module'

describe('FlashcardsService', () => {
  let module: TestingModule
  let service: FlashcardsService

  beforeAll(async () => {
    module = await Test.createTestingModule({
      // eslint-disable-next-line no-extra-parens
      imports: [...(await getTestingMongooseModuleImports()), FlashcardsModule],
    }).compile()

    service = module.get<FlashcardsService>(FlashcardsService)
  })

  afterAll(async () => {
    await module.close()
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
