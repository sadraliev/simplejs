import * as http from 'http'
import { ServerResponse } from 'http'

export interface Response extends http.ServerResponse {
  status: (code?: number) => Response
  json: (content: Record<string, string>) => Response
  send: (content: Buffer | string) => Response
  redirect: (url: string) => Response
}

export function response(res: ServerResponse): Response {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const response: Response = res
  function end(content: Buffer | string | Record<string, string>): Response {
    response.setHeader('Content-Length', content.length)
    response.status()
    response.end(content)
    return response
  }
  response.status = (code?: number) => {
    response.statusCode = code || res.statusCode
    return response
  }
  response.send = (content) => {
    response.setHeader('Content-Type', 'text/html')
    return end(content)
  }
  response.json = (content: Record<string, string>) => {
    // eslint-disable-next-line no-useless-catch
    try {
      const serialized = JSON.stringify(content)
      res.setHeader('Content-Type', 'application/json')
      return end(serialized)
    } catch (err) {
      throw err
    }
  }
  response.redirect = (url: string) => {
    response.setHeader('Location', url)
    response.status(301)
    response.end()
    return response
  }
  return response
}
