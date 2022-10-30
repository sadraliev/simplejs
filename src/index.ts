import config from './config'
import Simple from './core/simple'
import * as fs from 'fs'
import * as path from 'path'

const app = new Simple()
app.use('/', (req, res) => {
  console.log('res', res)
  fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
    res.setHeader('Content-Type', 'text/html')
    if (err) {
      res.writeHead(500)
      return res.end('Some error occured')
    }
    res.writeHead(200)
    return res.end(data)
  })
})

app.listen(config().PORT || 3000, () => console.log('Server running on port ' + config().PORT))
