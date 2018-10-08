import { interfaces, ContainerModule } from 'inversify'
import { Database } from './database'

export const databaseContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<Database>(Database)
    .toSelf()
    .inSingletonScope()
})
