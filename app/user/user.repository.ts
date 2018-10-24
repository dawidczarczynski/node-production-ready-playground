import { injectable, inject } from 'inversify'
import { Schema } from 'mongoose'

import { DB_TYPES } from '@database/ioc/database.types'
import { IDatabase } from '@database'
import { GenericRepository } from '@generics/generic.repository'

import { IUserDocument } from './model/user.document'
import { IUserRepository } from '@user/interfaces/user-repository.interface'
import { USER_TYPES } from '@user/ioc/user.types'
import { IUser } from '@user/model/user.interface'

@injectable()
export class UserRepository extends GenericRepository<IUserDocument> implements IUserRepository {

  constructor (
    @inject(DB_TYPES.instance) _db: IDatabase,
    @inject(USER_TYPES.schema) _userSchema: Schema,
    @inject(USER_TYPES.model) _userModel: string
  ) {
    super(_db, _userSchema, _userModel)
  }

  public async add (user: IUser): Promise<IUserDocument> {
    return this._add<IUser>(user)
  }

  public async findByUsername (username: string): Promise<IUserDocument> {
    return this.findOne({ username })
  }

  public async findByEmail (email: string): Promise<IUserDocument> {
    return this.findOne({ email })
  }

}
