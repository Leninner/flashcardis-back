import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type UserDocument = User & Document

@Schema({
  timestamps: true,
  collection: 'users',
})
export class User {
  @Prop({
    required: true,
    unique: true,
  })
  email: string

  @Prop({
    required: true,
  })
  password: string

  @Prop({
    required: true,
    type: String,
  })
  name: string

  @Prop({
    required: true,
    type: Array,
  })
  role: string[]

  @Prop({
    required: true,
  })
  createdAt: Date

  @Prop({
    auto: true,
  })
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
