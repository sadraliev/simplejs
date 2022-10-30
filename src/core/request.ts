import { IncomingMessage } from 'http'
import * as url from 'url'

export function request(req: IncomingMessage): Request {
  const parsedUrl = url.parse(`${req.headers.host}${req.url}`, true)
  const request = Object.assign({}, req, parsedUrl)
  return request
}

export type Request = IncomingMessage &
  url.UrlWithParsedQuery & {
    params?: Record<string, string>
  }
