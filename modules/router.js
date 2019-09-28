const express = require('express')
const path = require('path')
const employees = require('../api/employee-db')
const router = express.Router()

router.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, '../pages/index.html'))
})

// para cargar los datos de la api
router.get('/api/employee-db', employees.loadEmployees)
router.get('/api/employee-db/:query', employees.searchEmployees)

// para postear nuevos datos a la api
router.post('/api/employee-db', employees.postEmployee)

// para encontrar empleado por ID
router.get('/api/employee-db/:id', employees.getEmployeeByID)

// para modificar datos de la api
router.patch('/api/employee-db/:id', employees.patchEmployee)

// para eliminar datos
router.delete('/api/employee-db/:id', employees.deleteEmployee)

module.exports = router