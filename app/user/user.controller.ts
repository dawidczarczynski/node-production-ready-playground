import { Request } from 'express'
import { inject } from 'inversify'
import {
  controller,
  httpGet,
  httpPost,
  httpPatch,
  httpDelete,
  request,
  requestParam
} from 'inversify-express-utils'

import { UserService } from './user.service'
import { userValidator } from './user.validator'
import { USER_TYPES } from '@user/ioc/user.types'

@controller('/user')
export default class UserController {

  constructor (@inject(USER_TYPES.service) private _userService: UserService) {}

  @httpGet('/')
  public async getAllUsers () {
    return this._userService.getAllUsers()
  }

  @httpGet('/:id')
  public async getUser (@requestParam('id') id: string) {
    return this._userService.getUser(id)
  }

  @httpPost('/', userValidator)
  public createUser (@request() { body }: Request) {
    const { username, email } = body

    return this._userService.createUser({ username, email })
  }

  @httpPatch('/:id')
  public updateUser (request: Request) {
    console.log('update user')
  }

  @httpDelete('/:id')
  public deleteUser (request: Request) {
    console.log('delete user')
  }

}
