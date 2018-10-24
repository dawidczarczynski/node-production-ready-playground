import { IUser } from './user.interface'
import { ApiModel, ApiModelProperty } from 'swagger-express-ts'

@ApiModel({
  description: 'User model',
  name: 'User'
})
export class User implements IUser {

  @ApiModelProperty({
    description: 'Username',
    required: true
  })
  public username: string

  @ApiModelProperty({
    description: 'Email address',
    required: true
  })
  public email: string

  constructor (username: string, email: string) {
    this.username = username
    this.email = email

    Object.freeze(this)
  }

}
