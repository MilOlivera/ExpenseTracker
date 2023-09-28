const express = require('express')
const cors = require('cors')
const app = express()
const { db } = require('./db/db')
const { readdirSync } = require('fs')

require('dotenv').config()

const PORT = process.env.PORT

//MIDDLEWARES
app.use(express.json())
app.use(cors())

// ROUTES
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route))) //va a leer los archivos que esten en esta ruta


const server = () => {
    db()
    app.listen(PORT, () => {
        console.log('Estas en el puerto:', PORT)
    })
}
server()