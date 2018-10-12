import * as joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import { BadRequestError } from '@errors'
import { IUser } from '@user/model/user.interface'

const userSchema = joi.object({
  username: joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  email: joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
})

export const validateUser = (user: IUser) => {
  const { error } = joi.validate(user, userSchema)

  if (error) {
    const { details } = error
    const message = details.map(details => details.message).join(', ')

    throw new BadRequestError(message)
  }
}

export const userValidator = (request: Request, response: Response, next: NextFunction) => {
  validateUser(request.body)

  return next()
}
