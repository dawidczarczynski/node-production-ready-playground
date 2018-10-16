import { IUserDocument } from '@user/model/user.document'

export interface IUserRepository {
  add<U> (data: U): Promise<IUserDocument>
  findById (id: string): Promise<IUserDocument>
  findByUsername (username: string): Promise<IUserDocument>
  findByEmail (email: string): Promise<IUserDocument>
  find (): Promise<IUserDocument[]>
}
