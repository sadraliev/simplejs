import { IncomingMessage } from 'http'
import { UrlWithParsedQuery } from 'url'
import * as url from 'url'

export function request(req: IncomingMessage): Request {
  const request: Request = Object.assign(req)
  const parsedUrl = url.parse(`${req.headers.host}${req.url}`, true)
  request.parsedUrl = parsedUrl
  return request
}

export interface Request extends IncomingMessage {
  parsedUrl: UrlWithParsedQuery
  params?: null | Record<string, string>
}
