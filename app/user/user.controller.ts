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
import { ApiPath, ApiOperationGet, SwaggerDefinitionConstant, ApiOperationPost, ApiOperationPatch, ApiOperationDelete } from 'swagger-express-ts'

@ApiPath({
  path: '/user',
  name: 'User'
})
@controller('/user')
export class UserController {

  constructor (@inject(USER_TYPES.service) private _userService: UserService) {}

  @ApiOperationGet({
    description: 'Get all user objects list',
    summary: 'Get users list',
    responses: {
      200: { description: 'Success', type: SwaggerDefinitionConstant.Response.Type.ARRAY }
    }
  })
  @httpGet('/')
  public async getAllUsers () {
    return this._userService.getAllUsers()
  }

  @ApiOperationGet({
    description: 'Get single user object',
    path: '/{id}',
    summary: 'Get user',
    parameters: {
      path: {
        id: { description: 'User ID', type: SwaggerDefinitionConstant.Parameter.Type.STRING }
      }
    },
    responses: {
      200: { description: 'Success', type: SwaggerDefinitionConstant.Response.Type.OBJECT },
      400: { description: 'Wrong id format' },
      404: { description: 'Not found' }
    }
  })
  @httpGet('/:id')
  public async getUser (@requestParam('id') id: string) {
    return this._userService.getUser(id)
  }

  @ApiOperationPost({
    summary: 'Create an user',
    parameters: {
      body: { description: 'New user', required: true, model: 'User' }
    },
    responses: {
      200: { description: 'Success', type: SwaggerDefinitionConstant.Response.Type.OBJECT, model: 'User' },
      400: { description: 'Wrong body format' }
    }
  })
  @httpPost('/', userValidator)
  public createUser (@request() { body }: Request) {
    const { username, email } = body

    return this._userService.createUser({ username, email })
  }

  @ApiOperationPatch({
    summary: 'Update user data',
    path: '/{id}',
    parameters: {
      path: {
        id: { description: 'User ID', type: SwaggerDefinitionConstant.Parameter.Type.STRING }
      }
    },
    responses: {
      200: { description: 'Success' }
    }
  })
  @httpPatch('/:id')
  public updateUser (request: Request) {
    console.log('update user')
  }

  @ApiOperationDelete({
    summary: 'Remove user account',
    path: '/{id}',
    parameters: {
      path: {
        id: { description: 'User ID', type: SwaggerDefinitionConstant.Parameter.Type.STRING }
      }
    },
    responses: {
      201: { description: 'Success' }
    }
  })
  @httpDelete('/:id')
  public deleteUser (request: Request) {
    console.log('delete user')
  }

}
