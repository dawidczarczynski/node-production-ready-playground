import { injectable, inject } from 'inversify'
import { UserRepository } from '../user/user.repository'
import { IUser } from 'user/user.interface'
import { NotFoundError } from '../errors'
import { UserError } from './user-error.enum'

@injectable()
export class UserService {

  constructor (@inject(UserRepository) private _repo: UserRepository) {}

  public async getUser (id: string): Promise<IUser> {
    const user = await this._repo.findOne(id)

    if (!user) throw new NotFoundError(UserError.NOT_FOUND)

    return user
  }

  getAllUsers () {
    return this._repo.getAll()
  }

}
