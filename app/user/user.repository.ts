import { injectable, inject } from 'inversify'
import { Types } from 'mongoose'

import { Database } from '../database/database'
import { USER_MODEL } from './user.schema'
import { IUser } from './user.interface'
import { InternalError } from '../errors'

@injectable()
export class UserRepository {

  constructor (@inject(Database) private _db: Database) {}

  public async model () {
    const instance = await this._db.connect()

    return instance
      .model<IUser>(USER_MODEL)
  }

  public async findOne (id: string): Promise<IUser> {
    const model = await this.model()

    return model.findById(id, (error) => {
      if (error) throw new InternalError('Database error')
    })
  }

  public async getAll (): Promise<IUser[]> {
    const model = await this.model()

    return model
      .find()
  }

}
