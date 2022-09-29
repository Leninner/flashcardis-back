import { Test } from '@nestjs/testing'
import { FlashcardsController } from './flashcards.controller'
import { FlashcardsService } from './flashcards.service'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { Connection, connect } from 'mongoose'
import { MongooseModule } from '@nestjs/mongoose'
import { Flashcard, FlashcardSchema } from './schemas/flashcard.schema'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fixtures = require('node-mongodb-fixtures')

interface IFakeDbConnection {
  mongod: MongoMemoryServer
  mongoConnection: Connection
  mongoUri: string
}

const startFakeDbConnection = async (): Promise<IFakeDbConnection> => {
  const fixtures = new Fixtures({
    dir: 'src/fixtures/',
    filter: '.*',
    mute: true,
  })

  const mongod: MongoMemoryServer = await MongoMemoryServer.create()
  const mongoUri = mongod.getUri()
  await fixtures.connect(mongoUri, {
    useUnifiedTopology: true,
  })
  await fixtures.unload()
  await fixtures.load()
  await fixtures.disconnect()

  const mongoConnection: Connection = (await connect(mongoUri)).connection

  return {
    mongod,
    mongoConnection,
    mongoUri,
  }
}

describe('FlashcardsController', () => {
  let controller: FlashcardsController
  let fakeConnection: IFakeDbConnection

  beforeAll(async () => {
    fakeConnection = await startFakeDbConnection()
    const { mongoUri } = fakeConnection
    const module = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(mongoUri, { useNewUrlParser: true }),
        MongooseModule.forFeature([
          { name: Flashcard.name, schema: FlashcardSchema },
        ]),
      ],
      controllers: [FlashcardsController],
      providers: [FlashcardsService],
    }).compile()

    controller = module.get<FlashcardsController>(FlashcardsController)
  })

  afterAll(async () => {
    await fakeConnection.mongoConnection.dropDatabase()
    await fakeConnection.mongoConnection.close()
    await fakeConnection.mongod.stop()
  })

  it('should be defined', () => {
    expect(controller).toBeDefined()
  })
})
