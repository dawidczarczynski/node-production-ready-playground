import { IUser } from './user.interface'

export class User implements IUser {

  constructor (public username: string, public email: string) {
    Object.freeze(this)
  }

}
