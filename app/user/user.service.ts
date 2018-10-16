import { injectable, inject } from 'inversify'
import { IUser } from './model/user.interface'
import { User } from './model/user'
import { UserError } from './user-error.enum'
import {
  NotFoundError,
  DbDuplicatedKeyError,
  BadRequestError,
  InternalError
} from '@errors'
import { IUserRepository } from '@user/user-repository.interface'
import { USER_TYPES } from '@user/ioc/user.types'

@injectable()
export class UserService {

  constructor (@inject(USER_TYPES.repository) private _repo: IUserRepository) {}

  public async getUser (id: string): Promise<IUser> {
    const user = await this._repo.findById(id)

    if (!user) throw new NotFoundError(UserError.NOT_FOUND)

    return user
  }

  public async getAllUsers () {
    return this._repo.find()
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
