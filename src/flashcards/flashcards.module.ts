import { Module } from '@nestjs/common'
import { FlashcardsService } from './flashcards.service'
import { FlashcardsController } from './flashcards.controller'
import { Flashcard, FlashcardSchema } from './schemas/flashcard.schema'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Flashcard.name, schema: FlashcardSchema },
    ]),
  ],
  controllers: [FlashcardsController],
  providers: [FlashcardsService],
})
export class FlashcardsModule {}
