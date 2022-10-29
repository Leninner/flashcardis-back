import { MongoMemoryServer } from 'mongodb-memory-server'
import { Connection, connect } from 'mongoose'

// eslint-disable-next-line @typescript-eslint/no-var-requires
const Fixtures = require('node-mongodb-fixtures')

export interface IFakeDbConnection {
  mongod: MongoMemoryServer
  mongoConnection: Connection
  mongoUri: string
}

export const startFakeDbConnection = async (): Promise<IFakeDbConnection> => {
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
