import * as http from 'http'

export interface Response extends http.ServerResponse {
  status: (code?: number) => Response
  json: (content: Record<string, string>) => Response
  send: (content: string) => Response
  redirect: (url: string) => Response
}

export function response(res: http.ServerResponse): void {
  // function end(content: string | Record<string, string>): Response {
  //   res.setHeader('Content-Length', content.length)
  //   res.status()
  //   res.end(content)
  //   return res
  // }
  // res.status = (code?: number) => {
  //   res.statusCode = code || res.statusCode
  //   return res
  // }
  // res.send = (content: string) => {
  //   res.setHeader('Content-Type', 'text/html')
  //   return end(content)
  // }
  // res.json = (content: Record<string, string>) => {
  //   // eslint-disable-next-line no-useless-catch
  //   try {
  //     const serialized = JSON.stringify(content)
  //     res.setHeader('Content-Type', 'application/json')
  //     return end(serialized)
  //   } catch (err) {
  //     throw err
  //   }
  // }
  // res.redirect = (url: string) => {
  //   res.setHeader('Location', url)
  //   res.status(301)
  //   res.end()
  //   return res
  // }
}
