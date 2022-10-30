export const matchPath = function (setupPath: string, currentPath: string): MatchType {
  /**
   * example:
   * setupPath = middleware.path = '*'
   * currentPath = req.pathname = /hello = http://localhost:8080/hello
   */

  const setupPathArray = setupPath.split('/')
  const currentPathArray = currentPath.split('/')
  const setupArrayLength = setupPathArray.length

  let match = true
  const params: Record<string, string> = {}

  for (let i = 0; i < setupArrayLength; i++) {
    const route = setupPathArray[i]
    const path = currentPathArray[i]
    if (route[0] === ':') {
      params[route.substr(1)] = path
    } else if (route === '*') {
      break
    } else if (route !== path) {
      match = false
      break
    }
  }

  return match ? { matched: true, params } : { matched: false }
}

export type MatchType = {
  matched: boolean
  params?: Record<string, string>
}
