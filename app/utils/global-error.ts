import { Response, Request, NextFunction } from 'express'

export const globalErrorHandler = (
  error: Error,
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const { message } = error
  response
    .status(400)
    .json({ error: message })
}
