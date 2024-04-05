const app = require('./app')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
dotenv.config({path : './environment/config.env'})

const connection = mongoose.connect(process.env.CONNECTION).then(el=>{
    console.log('connection establish')
})

app.listen(process.env.PORT, (req, res)=>{
    console.log(`The Backend is working at ${process.env.PORT}`)
})