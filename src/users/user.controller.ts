import { Body, Controller, Post, UseFilters } from '@nestjs/common'
import { ValidationFilter } from '../exceptions/validation-filter.utils'
import { CreateUserDto } from './dtos/create-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @UseFilters(new ValidationFilter())
  createUser(@Body() data: CreateUserDto) {
    return this.userService.create(data)
  }
}
