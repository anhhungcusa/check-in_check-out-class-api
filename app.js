require('dotenv').config()
const express = require('express')
const bodyParser = require('body-parser')
const {env} = require('./config/globals') 
const { createConnection } = require("./db");

const userRoute = require('./routes/user.route')

const app = express()
const port = env.PORT


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


const initRestRoutes = require("./routes/index");

// error handler middleware
const errorHandler = require("./middlewares/error-handler");

// connect mongoose
createConnection();
// init routes
initRestRoutes(app);
app.use(errorHandler);

app.get('/', (req, res) => res.send('Hello World test!'))

app.use('/users', userRoute)

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))