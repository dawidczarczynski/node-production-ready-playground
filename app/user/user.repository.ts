import { injectable, inject } from 'inversify'
import { Schema } from 'mongoose'

import { Database, IDatabase } from '@database'
import { GenericRepository } from '@generics/generic.repository'

import { IUserDocument } from './model/user.document'
import { IUserRepository } from '@user/user-repository.interface'

@injectable()
export class UserRepository extends GenericRepository<IUserDocument> implements IUserRepository {

  constructor (
    @inject(Database) _db: IDatabase,
    @inject('UserSchema') _userSchema: Schema,
    @inject('UserModel') _userModel: string
  ) {
    super(_db, _userSchema, _userModel)
  }

  public async findByUsername (username: string): Promise<IUserDocument> {
    return this.findOne({ username })
  }

  public async findByEmail (email: string): Promise<IUserDocument> {
    return this.findOne({ email })
  }

}
