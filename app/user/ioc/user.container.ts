import { ContainerModule, interfaces } from 'inversify'
import { Schema } from 'mongoose'

import { UserSchema } from '../model/user.schema'
import { USER_TYPES } from './user.types'

export const userContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<Schema>(USER_TYPES.schema).toConstantValue(UserSchema)
  bind<string>(USER_TYPES.model).toConstantValue('UserModel')
})
