import { Response, Request, NextFunction } from 'express'
import { errorCodeFactory } from './error-code'

export const globalErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {

  const code = errorCodeFactory(error)
  const { message } = error

  response
    .status(code)
    .json({ error: message })
}
