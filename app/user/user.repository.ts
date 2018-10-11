import { inject, injectable } from 'inversify'
import { Schema } from 'mongoose'

import { Database } from '@database'
import { GenericRepository } from '@generics/generic.repository'

import { USER_TYPES } from './ioc/user.types'
import { IUserDocument } from './model/user.document'

@injectable()
export class UserRepository extends GenericRepository<IUserDocument> {

  constructor (
    db: Database,
    @inject(USER_TYPES.schema) schema: Schema,
    @inject(USER_TYPES.model) model: string
  ) {
    super(db, schema, model)
  }

}
