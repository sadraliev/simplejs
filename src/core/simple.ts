import * as http from 'http'
import { validateMiddleware } from '../utils/middleware.validate'
import { Middleware, Handler } from './types/common.type'
import { Request, request } from './request'
import { Response, response } from './response'
import { matchPath } from '../utils/matcher'
import { ErrorMessage } from '../shared/enums/error-message.enum'

export default class Simple {
  // Basic Middleware Pattern in JavaScript
  // https://muniftanjim.dev/blog/basic-middleware-pattern-in-javascript/
  private readonly middlewares: Middleware[] = []

  use(route: string | null, middleware: Handler) {
    /**
     * app.use('*', (req, res, next) => {})
     *
     * path = "*"
     * handler = Function (anonymous)
     */
    const { path, handler } = validateMiddleware(route, middleware)

    this.middlewares.push({
      path,
      handler
    })
  }

  handle(req: Request, res: Response) {
    /* Will do middleware handling here*/
    const next = this.findNext(req, res)
    // запуск раннера по всем миддлверам
    next()
  }

  listen(port = 8080, cb: any) {
    return http
      .createServer((req, res) => {
        // const extendedRequest = request(req)
        // const extendedResponse = response(res)
        // this.handle(extendedRequest, extendedResponse)
        res.writeHead(200, { 'Content-Type': 'text/html' })
        res.write('Hello world')
        res.end()
      })
      .listen({ port }, () => {
        if (cb) {
          if (typeof cb === 'function') {
            return cb()
          }
          throw new Error('Listen callback needs to be a function')
        }
      })
  }

  findNext(req: Request, res: Response) {
    let current = -1
    const next = () => {
      current += 1
      const middleware = this.middlewares[current]

      if (!req.pathname) {
        throw new Error(ErrorMessage.PATH_TO_BE_STRING)
      }

      const { matched = false, params = {} } = middleware
        ? matchPath(middleware.path, req.pathname)
        : {}

      if (matched) {
        req.params = params
        middleware.handler(req, res, next)
        // если нет совпадений по маршруту
        // и счетчик меньше или равно длине массива с мидлварами
        // то вызови следующий мидлвар
      } else if (current <= this.middlewares.length) {
        next()
      }
    }
    return next
  }
}
