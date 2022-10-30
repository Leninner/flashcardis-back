import { UserDto } from './user.dto'

export class LoginResponse {
  accessToken: string
  user: Omit<UserDto, 'password'>
}
