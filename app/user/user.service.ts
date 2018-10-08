import { injectable, inject } from 'inversify'
import { UserRepository } from '../user/user.repository'
import { IUser } from 'user/user.interface'

@injectable()
export class UserService {

  constructor (@inject(UserRepository) private _repo: UserRepository) {}

  public async getUser (_id: number): Promise<IUser> {
    try {
      const user = await this._repo.find({ _id })
      if (!user) throw new Error('User not found')

      return user
    } catch (ex) {
      throw new Error('Cannot retreive user')
    }
  }

  getAllUsers () {
    return this._repo.getAll()
  }

}
