const http = require("http");
const fs = require("fs");
const path = require("path");
const request = require('./request');
const response = require("./response");
const { checkMiddlewareInputs, matchPath } = require('./utils/helpers');

function Simple() {
  // Basic Middleware Pattern in JavaScript
  // https://muniftanjim.dev/blog/basic-middleware-pattern-in-javascript/

  const _middlewares = []

  function use(...args) {
    /**
     * app.use('*', (req, res, next) => {})
     *
     * path = "*"
     * handler = Function (anonymous)
     */
    const { path, handler } = checkMiddlewareInputs(args)

    _middlewares.push({
      path,
      handler
    });
  }



  function findNext(req, res) {
    let current = -1;
    const next = () => {
      current += 1;
      const middleware = _middlewares[current];
      const { matched = false, params = {} } = middleware ? matchPath(middleware.path, req.pathname) : {};

      if (matched) {
        req.params = params;
        middleware.handler(req, res, next);
        // если нет совпадений по маршруту
        // и счетчик меньше или равно длине массива с мидлварами
        // то вызови следующий мидлвар
      } else if (current <= _middlewares.length) {
        next();

      } else {
        req.handler(req, res);
      }
    };
    return next;
  }

  function handle(req, res) {
    /* Will do middleware handling here*/
    const next = findNext(req, res);
    // запуск раннера по всем миддлверам
    next();

  }
  function listen(port = 8080, cb) {
    return http
      .createServer((req, res) => {
        request(req)
        response(res)
        handle(req, res);

      })
      .listen({ port }, () => {
        if (cb) {
          if (typeof cb === 'function') {
            return cb();
          }
          throw new Error('Listen callback needs to be a function');
        }
      });
  }
  return {
    listen,
    use
  }
}

module.exports = Simple
