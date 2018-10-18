import { model, Model } from 'mongoose'

import { IUserRepository } from '@user/user-repository.interface'
import { IUserDocument } from '@user/model/user.document'
import { UserSchema } from '@user/model/user.schema'
import { IUser } from '@user/model/user.interface'
import { dummyUser } from '@stubs/user/user.mock'
import { DbDuplicatedKeyError } from '@errors'
import { DBErrors } from '@database'

export class UserRepositoryStub implements IUserRepository {

  public returnEmptyUser = false
  public throwDuplicatedKeyError = false
  public throwOtherError = false

  private model: Model<IUserDocument> = model('userTestModel', UserSchema)

  add (user: IUser): Promise<IUserDocument> {
    if (this.throwDuplicatedKeyError) {
      throw new DbDuplicatedKeyError(DBErrors.DUPLICATED_KEY)
    }

    if (this.throwOtherError) {
      throw new Error('Something gone wrong')
    }

    const newUser = new this.model(user)
    return Promise.resolve(newUser)
  }

  findById (id: string): Promise<IUserDocument> {
    if (this.returnEmptyUser) {
      return Promise.resolve(undefined)
    }

    const user = new this.model(dummyUser)
    return Promise.resolve(user)
  }

  findByUsername (username: string): Promise<IUserDocument> {
    throw new Error('Method not implemented.')
  }

  findByEmail (email: string): Promise<IUserDocument> {
    throw new Error('Method not implemented.')
  }

  find (): Promise<IUserDocument[]> {
    throw new Error('Method not implemented.')
  }

}
