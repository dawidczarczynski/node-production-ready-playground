import { ContainerModule, interfaces } from 'inversify'
import { UserService } from './user.service'
import { UserRepository } from './user.repository'

export const userContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<UserRepository>(UserRepository).toSelf()
  bind<UserService>(UserService).toSelf()
})
