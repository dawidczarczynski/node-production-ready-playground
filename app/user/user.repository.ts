import { injectable, inject } from 'inversify'

import { USER_MODEL } from './user.schema'
import { IUser } from './user.interface'
import { Database } from '../database/database'

@injectable()
export class UserRepository {

  constructor (@inject(Database) private _db: Database) {}

  public async model () {
    const instance = await this._db.connect()

    return instance
      .model<IUser>(USER_MODEL)
  }

  public async find (id: string): Promise<IUser> {
    const model = await this.model()

    return model
      .findById(id)
  }

  public async getAll (): Promise<IUser[]> {
    const model = await this.model()

    return model
      .find()
  }

}
