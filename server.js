const express = require('express')
const router = require('./modules/router')
const server = express()
const port = 3000

server.use(express.static('public'))
server.use(router)

server.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
})