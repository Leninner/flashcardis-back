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
  userName: string

  @Prop({
    required: true,
    type: Array,
  })
  role: string[]

  @Prop({
    autopopulate: true,
  })
  createdAt: Date

  @Prop({
    autopopulate: true,
  })
  updatedAt: Date
}

export const UserSchema = SchemaFactory.createForClass(User)
