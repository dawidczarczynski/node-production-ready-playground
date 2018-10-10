import { InternalError, NotFoundError, BadRequestError } from '../errors'

enum ErrorCode {
  BAD_REQUEST = 400,
  NOT_FOUND = 404,
  INTERNAL_SERVER_ERROR = 500
}

export const errorCodeFactory = (error: Error): number => {

  if (error instanceof BadRequestError) return ErrorCode.BAD_REQUEST
  if (error instanceof InternalError) return ErrorCode.INTERNAL_SERVER_ERROR
  if (error instanceof NotFoundError) return ErrorCode.NOT_FOUND

  // Default value
  return ErrorCode.INTERNAL_SERVER_ERROR

}
