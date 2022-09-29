import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Flashcard, FlashcardDocument } from './schemas/flashcard.schema'

@Injectable()
export class FlashcardsService {
  constructor(
    @InjectModel(Flashcard.name)
    private flashcardModel: Model<FlashcardDocument>,
  ) {}

  async create(createCatDto): Promise<Flashcard> {
    const createdCat = new this.flashcardModel(createCatDto)
    return createdCat.save()
  }

  async findAll(): Promise<Flashcard[]> {
    return this.flashcardModel.find().exec()
  }
}
