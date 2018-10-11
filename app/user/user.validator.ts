import * as joi from 'joi'
import { Request, Response, NextFunction } from 'express'

import { BadRequestError } from '@errors'

export const userSchema = joi.object({
  username: joi.string()
    .alphanum()
    .min(3)
    .max(20)
    .required(),
  email: joi.string()
    .email({ minDomainAtoms: 2 })
    .required()
})

export const userValidator = (request: Request, response: Response, next: NextFunction) => {
  const { error } = joi.validate(request.body, userSchema)

  if (error) {
    const { details } = error
    const message = details.map(details => details.message).join(', ')

    throw new BadRequestError(message)
  }

  return next()
}
