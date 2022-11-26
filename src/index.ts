import config from './config'
import Simple from './core/simple'
import * as fs from 'fs'
import * as path from 'path'

const app = new Simple()

app.use('/', async (req, res, next) => {
  fs.readFile(path.resolve(__dirname, '..', 'public', 'index.html'), (err, data) => {
    if (err) {
      res.status(500).send('Error Occured')
      return next()
    }
    res.status(200).send(data)
    return next()
  })
})

app.use('/hello', (req, res, next) => {
  res.status(404).send('World!')
  next()
})

app.use('*', (req, res, next) => {
  res.status(200).end()
  next()
})

app.listen(config().PORT, () => console.log('Server running on port ' + config().PORT))
