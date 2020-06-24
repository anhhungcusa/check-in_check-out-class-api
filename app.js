require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const {env} = require('./config/globals') 
const { createConnection } = require("./db");

const app = express()
const port = env.PORT


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const initRestRoutes = require("./routes/index");
const corsMiddleware = require('./middlewares/cors')

// error handler middleware
const errorHandler = require("./middlewares/error-handler");

// connect mongoose
createConnection();
// init routes

initRestRoutes(app);
app.use(corsMiddleware);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Hello World test!'))

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))