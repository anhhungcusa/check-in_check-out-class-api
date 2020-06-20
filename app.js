const express = require('express')

const app = express()
const port = 3000

const {env} = require('./config/globals') 
const { createConnection } = require("./db");

// connect mongoose
createConnection();

app.get('/', (req, res) => res.send('Hello World test!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))