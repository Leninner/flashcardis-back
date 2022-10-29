import { Controller, Get } from '@nestjs/common'
import { UserService } from './user.service'

@Controller('flashcards')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  create() {
    return this.userService.create()
  }
}
