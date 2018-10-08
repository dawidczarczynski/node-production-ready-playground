import { Schema, Model, model } from 'mongoose'
import { IUser } from '../user/user.interface'

const UserSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }
})

export const USER_MODEL = 'User'
export const User: Model<IUser> = model<IUser>(USER_MODEL, UserSchema)
