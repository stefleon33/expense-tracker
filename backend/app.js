const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs')
const app = express()

require('dotenv').config()

const Port = process.env.Port

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(Port, () =>{
        console.log('Listening to port: ', Port)
    })
}

server ()