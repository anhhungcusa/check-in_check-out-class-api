const express = require('express')
var bodyParser = require('body-parser')
const {env} = require('./config/globals') 
const { createConnection } = require("./db");

const userRoute = require('./routes/user.route')

const app = express()
const port = env.PORT

// connect mongoose
createConnection();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.get('/', (req, res) => res.send('Hello World test!'))

app.use('/users', userRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))