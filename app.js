const express = require('express')
const cors = require('cors')
const app = express()
var bodyParser = require('body-parser');
app.use(bodyParser.json());
// in latest body-parser use like below.
app.use(bodyParser.urlencoded());
app.use(express.json())
app.use(cors())

const auth = require('./routes/authRoutes')
app.use('/api/v1/user', auth)

const retialRoutes = require('./routes/retailClientRoutes')
app.use('/api/v1/client', retialRoutes)

module.exports = app