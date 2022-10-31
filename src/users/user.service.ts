import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { CreateUserDto } from './dtos/create-user.dto'
import { User, UserDocument } from './schemas/user.schema'
import * as bcryptjs from 'bcryptjs'
import { CreateUserErrors } from '../constants/create-user-errors.utils'
import { ROLES } from '../constants/roles.utils'

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.findOne({
      $or: [
        {
          email: createUserDto.email,
        },
        {
          userName: createUserDto.userName,
        },
      ],
    })

    if (user) {
      throw new Error(CreateUserErrors.UserAlreadyExists)
    }

    const salt = bcryptjs.genSaltSync()

    createUserDto.password = bcryptjs.hashSync(createUserDto.password, salt)

    return this.userModel.create({
      ...createUserDto,
      roles: [ROLES.USER],
    })
  }

  findOne(email: string): Promise<User | undefined> {
    return this.userModel.findOne({ email }).exec()
  }
}
