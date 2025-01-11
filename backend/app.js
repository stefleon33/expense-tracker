const express = require('express')
const cors = require('cors');

const app = express()
require('dotenv').config()

const Port = process.env.Port

//middlewares
app.use(express.json())
app.use(cors())

app.get('/', (req, res) =>{
    res.send('Hello World')
})

const server = () => {
    app.listen(Port, () =>{
        console.log('Listening to port: ', Port)
    })
}

server ()