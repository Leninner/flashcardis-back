import { Controller, Get } from '@nestjs/common'
import { FlashcardsService } from './flashcards.service'

@Controller('flashcards')
export class FlashcardsController {
  constructor(private readonly flashcardsService: FlashcardsService) {}

  @Get()
  create() {
    return this.flashcardsService.create({
      question: 'What is the capital of France?',
      answer: 'Paris',
    })
  }
}
