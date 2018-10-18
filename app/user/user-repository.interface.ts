import { IUserDocument } from '@user/model/user.document'
import { IUser } from '@user/model/user.interface'

export interface IUserRepository {
  add (data: IUser): Promise<IUserDocument>
  findById (id: string): Promise<IUserDocument>
  findByUsername (username: string): Promise<IUserDocument>
  findByEmail (email: string): Promise<IUserDocument>
  find (): Promise<IUserDocument[]>
}
