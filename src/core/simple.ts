import * as http from 'http'
import { validateMiddleware } from '../utils/middleware.validate'
import { Middleware, Handler } from './types/common.type'
import { Request, request } from './request'
import { matchPath } from '../utils/matcher'
import { ErrorMessage } from '../shared/enums/error-message.enum'
import { Response, response } from './response'

export default class Simple {
  // Basic Middleware Pattern in JavaScript
  // https://muniftanjim.dev/blog/basic-middleware-pattern-in-javascript/
  // https://www.devtools.tech/resources/s/build-your-own-expressjs-or-part-2---rid---negw30VulwpaVLRpxxMl
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
    this.execute(req, res)
  }

  listen(port = 8080, cb: unknown) {
    return http
      .createServer((req, res) => {
        console.log(req.url)
        console.log('*** headers ***')
        console.log(req.headers)

        const extendedRequest = request(req)
        const extendedResponse = response(res)
        this.handle(extendedRequest, extendedResponse)
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

  async execute(req: Request, res: Response) {
    let prevIndex = -1
    const runner = async (index: number): Promise<void> => {
      if (index === prevIndex) {
        throw new Error('next() called multiple times')
      }

      if (!req.parsedUrl.pathname) {
        throw new Error(ErrorMessage.PATH_TO_BE_STRING)
      }

      prevIndex = index
      const middleware = this.middlewares[prevIndex]

      const { matched = false, params = {} } = middleware
        ? matchPath(middleware.path, req.parsedUrl.pathname)
        : {}

      if (matched) {
        req.params = params
        middleware.handler(req, res, () => {
          return runner(index + 1)
        })
      } else if (prevIndex <= this.middlewares.length) {
        runner(index + 1)
      }
    }
    await runner(0)
  }
}
