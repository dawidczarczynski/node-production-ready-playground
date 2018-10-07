import { Request } from 'express'
import { inject } from 'inversify'
import { controller, httpGet } from 'inversify-express-utils'
import { UserService } from './user.service'

@controller('/user')
export default class UserController {

  constructor (@inject(UserService) private _userService: UserService) {
    console.log('Construtcting user controler')
  }

  @httpGet('/:id')
  public getUser (request: Request) {
    const { id } = request.params

    return this._userService.getUser(id)
  }
}
