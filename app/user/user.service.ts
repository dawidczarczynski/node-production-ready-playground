import { injectable } from 'inversify'

@injectable()
export class UserService {

  getUser (userId: number) {
    return ({
      userId,
      name: 'Some USER1'
    })
  }

  getAllUsers () {
    return [
      { userId: 1, name: 'Some User' },
      { userId: 2, name: 'Some User2' }
    ]
  }

}
