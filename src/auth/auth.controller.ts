import { Body, Controller, UseFilters } from '@nestjs/common'
// import { UserDto } from './dtos/user.dto'
import { AuthService } from './auth.service'
import { LoginDto } from './dtos/login.dto'
import { ValidationFilter } from '../exceptions/validation-filter.utils'

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // async login(@Body() user: UserDto) {
  //   return this.authService.login(user)
  // }

  // @UseFilters(new ValidationFilter())
  // async signup(@Body() user: UserDto) {
  //   return this.authService.signupAndLogin(user)
  // }

  @UseFilters(new ValidationFilter())
  async validateUser(@Body() loginDto: LoginDto) {
    return this.authService.validateUser(loginDto.email, loginDto.password)
  }
}
