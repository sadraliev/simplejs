import { Request } from '../request'
import { Response } from '../response'

export type Next = () => void
export type Handler = (req: Request, res: Response, next: Next) => void
export type Middleware = {
  path: string
  handler: Handler
}
