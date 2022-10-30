// const simple = require('./simple')
// const CONFIG = require('./config/config')

// const app = simple()

// app.use('*', (req, res, next) => {
//   console.log('*')
// })

// app.use('/hello', (req, res, next) => {
//   console.log('hello')
//   next()
// })
// app.use('/', (req, res) => {
//   fs.readFile(path.resolve(__dirname, 'public', 'index.html'), (err, data) => {
//     res.setHeader('Content-Type', 'text/html');
//     if (err) {
//       res.writeHead(500);
//       return res.end('Some error occured');
//     }
//     res.writeHead(200);
//     return res.end(data);
//   });
// })

// app.listen(CONFIG.PORT || 3000, () => console.log("Server running on port 8080"))
