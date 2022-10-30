import { HttpException, Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { UserDto } from './dtos/user.dto'
import * as bcryptjs from 'bcryptjs'
// import { LoginResponse } from './dtos/login-response.dto'
import { HTTP_CODES } from '../constants/http-codes.utils'
import { UserService } from '../users/user.service'

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDto> {
    const user = await this.userService.findOne(email)

    if (!user) {
      throw new HttpException(`User not found: ${email}`, HTTP_CODES.NOT_FOUND)
    }

    const passwordCorrect = bcryptjs.compareSync(pass, user.password)

    if (!passwordCorrect) {
      throw new HttpException(
        `Invalid password for ${email}`,
        HTTP_CODES.UNAUTHORIZED,
      )
    }

    return user
  }

  // async signupAndLogin(user: UserDto): Promise<LoginResponse> {
  //   // const createdUser = await firstValueFrom(
  //   //   this.userProxyService.send<UserDto>({ cmd: 'create-user' }, user),
  //   // )
  //   // return this.login(createdUser)
  // }

  // login(user: UserDto): LoginResponse {
  //   const payload = {
  //     id: user.id,
  //     firstname: user.firstname,
  //     email: user.email,
  //   }
  //   return {
  //     accessToken: this.jwtService.sign(payload),
  //     user: payload,
  //   }
  // }
}
