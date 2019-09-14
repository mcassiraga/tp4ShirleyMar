const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const router = require('./modules/router')
const server = express()
const port = 3000

server.use (
	bodyParser.urlencoded({
		extended: true
	})
)
server.use(bodyParser.json())

server.use(cors())
server.use(express.static('public'))
server.use(router)

server.listen(port, () => {
    console.log(`Corriendo en el puerto ${port}`)
})