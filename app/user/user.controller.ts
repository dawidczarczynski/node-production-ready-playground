import { Request, Response } from 'express'
import { inject } from 'inversify'
import { controller, httpGet, httpPost, httpPatch, httpDelete, response, request } from 'inversify-express-utils'
import * as joi from 'joi'

import { UserService } from './user.service'

@controller('/user')
export default class UserController {

  constructor (@inject(UserService) private _userService: UserService) {}

  @httpGet('/')
  public async getAllUsers () {
    return this._userService.getAllUsers()
  }

  @httpGet('/:id')
  public async getUser (
    @request() request: Request
  ) {
    const { id } = request.params
    return this._userService.getUser(id)
  }

  @httpPost('/')
  public createUser (request: Request) {
    console.log('create user')
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
