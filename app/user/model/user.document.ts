import { IUser } from './user.interface'
import { Document } from 'mongoose'

export interface IUserDocument extends IUser, Document {}
