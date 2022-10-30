import { ErrorMessage } from '../shared/enums/error-message.enum'
import { Handler, Middleware } from '../core/types/common.type'

export const validateMiddleware = function (path: string | null, handler: Handler): Middleware {
  let defaultPath = '*'
  let defaultHandler = null

  if (typeof path !== 'string') {
    throw new Error(ErrorMessage.PATH_TO_BE_STRING)
  }
  if (typeof handler !== 'function') {
    throw new Error(ErrorMessage.MIDDLEWARE_TO_BE_FUNCTION)
  }

  if (path) {
    defaultPath = path
  }
  defaultHandler = handler

  return {
    path,
    handler
  }
}
