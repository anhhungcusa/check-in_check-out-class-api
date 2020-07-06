const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const { env } = require('./config/globals')
const { createConnection } = require('./db')
const initRestRoutes = require('./routes/index')
const corsMiddleware = require('./middlewares/cors')
const errorHandler = require('./middlewares/error-handler')
// const delay = require("./middlewares/delay");

const app = express()
const server = http.Server(app)
const io = require('socket.io')(server)
const port = env.PORT

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect mongoose
createConnection()


// app.use(delay(10000));
app.use(corsMiddleware)
// init route
app.use(function(req, res, next) {
  req.io = io
  next()
})
initRestRoutes(app)

app.use(errorHandler)

app.get('/', (req, res) => res.send('Hello World test!'))


server.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))