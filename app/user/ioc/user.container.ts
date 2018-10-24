import { ContainerModule, interfaces } from 'inversify'
import { Schema } from 'mongoose'

import { IUserRepository } from '@user/interfaces/user-repository.interface'
import { UserRepository } from '@user/user.repository'
import { UserSchema } from '@user/model/user.schema'
import { USER_TYPES } from '@user/ioc/user.types'
import { UserService } from '@user/user.service'

// Import to create controller from metadata
import '@user/user.controller'

export const userContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>(USER_TYPES.repository).to(UserRepository)
  bind<UserService>(USER_TYPES.service).to(UserService)
  bind<Schema>(USER_TYPES.schema).toConstantValue(UserSchema)
  bind<string>(USER_TYPES.model).toConstantValue('UserModel')
})
