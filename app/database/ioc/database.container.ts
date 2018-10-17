import { ContainerModule, interfaces } from 'inversify'

import { IDatabase } from '@database/database.interface'
import { DB_TYPES } from '@database/ioc/database.types'
import { Database } from '@database/database'

export const dbContainer = new ContainerModule((bind: interfaces.Bind) => {
  bind<IDatabase>(DB_TYPES.instance).to(Database)
})
