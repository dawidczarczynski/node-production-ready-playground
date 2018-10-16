import { ContainerModule, interfaces } from 'inversify'
import { Schema } from 'mongoose'

import { IUserRepository } from '@user/user-repository.interface'
import { UserRepository } from '@user/user.repository'
import { UserSchema } from '@user/model/user.schema'

export const userContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserRepository>('IUserRepository').to(UserRepository)
  bind<Schema>('UserSchema').toConstantValue(UserSchema)
  bind<string>('UserModel').toConstantValue('UserModel')
})
