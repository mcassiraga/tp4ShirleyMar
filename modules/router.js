const express = require('express')
const path = require('path')
const employees = require('../api/employee-db')
const router = express.Router()

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/index.html'))
})

// para cargar los datos de la api
router.get('/api/employee-db', employees)

// para postear nuevos datos a la api
// router.post('/api/employee-db', employees.addEmployee)

module.exports = router