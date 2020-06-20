require('dotenv').config()
const express = require('express')

const app = express()
const bodyParse = require("body-parser");
const port = 3000

// const {env} = require('./config/globals') 
const { createConnection } = require("./db");

app.use(bodyParse.urlencoded({ extended: false }));
app.use(bodyParse.json());


const initRestRoutes = require("./routes/index");

// error handler middleware
const errorHandler = require("./middlewares/error-handler");

// connect mongoose
createConnection();


// init routes
initRestRoutes(app);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Hello World test!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))