import { ContainerModule, interfaces } from 'inversify'
import { Schema } from 'mongoose'

import { UserService } from '../user.service'
import { UserRepository } from '../user.repository'
import { UserSchema } from '../model/user.schema'
import { USER_TYPES } from './user.types'

export const userContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<Schema>(USER_TYPES.schema).toConstantValue(UserSchema)
  bind<string>(USER_TYPES.model).toConstantValue('UserModel')
  bind<UserService>(UserService).toSelf()
  bind<UserRepository>(UserRepository).toSelf()
})
