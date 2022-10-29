import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type FlashcardDocument = Flashcard & Document

@Schema({
  timestamps: true,
  collection: 'flashcards',
})
export class Flashcard {
  @Prop()
  question: string

  @Prop()
  answer: string
}

export const FlashcardSchema = SchemaFactory.createForClass(Flashcard)
