import { injectable, inject } from 'inversify'
import { UserRepository } from '../user/user.repository'
import { IUser } from './model/user.interface'
import { User } from './model/user'
import { UserError } from './user-error.enum'
import {
  NotFoundError,
  DbDuplicatedKeyError,
  BadRequestError,
  InternalError
} from '../errors'

@injectable()
export class UserService {

  constructor (@inject(UserRepository) private _repo: UserRepository) {}

  public async getUser (id: string): Promise<IUser> {
    const user = await this._repo.findOne(id)

    if (!user) throw new NotFoundError(UserError.NOT_FOUND)

    return user
  }

  public async getAllUsers () {
    return this._repo.getAll()
  }

  public async createUser ({ username, email }: IUser) {
    const newUser = new User(username, email)

    try {
      return await this._repo.add<IUser>(newUser)
    } catch (ex) {
      if (ex instanceof DbDuplicatedKeyError) throw new BadRequestError(UserError.ALREADY_EXISTS)
      throw new InternalError(ex.message)
    }
  }

}
