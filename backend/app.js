const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const { readdirSync } = require('fs')
const app = express()

require('dotenv').config()

const port = process.env.PORT

//middlewares
app.use(express.json())
app.use(cors())

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

const server = () => {
    db()
    app.listen(port, () =>{
        console.log('Listening to port: ', port || 3000
        )
    })
}

server ()