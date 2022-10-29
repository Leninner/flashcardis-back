import { DynamicModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import {
  Flashcard,
  FlashcardSchema,
} from '../flashcards/schemas/flashcard.schema'
import { User, UserSchema } from '../users/schemas/user.schema'
import { startFakeDbConnection } from './mongo-fake-connection.utils'

export const getTestingMongooseModuleImports = async (): Promise<
  Array<DynamicModule>
> => {
  const mongoUri = (await startFakeDbConnection()).mongoUri
  return [
    MongooseModule.forRoot(mongoUri, { useNewUrlParser: true }),
    MongooseModule.forFeature([
      { name: Flashcard.name, schema: FlashcardSchema },
      { name: User.name, schema: UserSchema },
    ]),
  ]
}
