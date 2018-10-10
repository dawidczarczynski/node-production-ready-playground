import { inject } from 'inversify'
import { Schema } from 'mongoose'

import { Database } from '../database/database'
import { GenericRepository } from '../generics/generic.repository'

import { IUser } from './model/user.interface'
import { USER_TYPES } from './ioc/user.types'

export class UserRepository extends GenericRepository<IUser> {

  constructor (
    @inject(Database) db: Database,
    @inject(USER_TYPES.schema) schema: Schema,
    @inject(USER_TYPES.model) model: string
  ) {
    super(db, schema, model)
  }

}
