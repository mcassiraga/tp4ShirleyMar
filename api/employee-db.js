const uniqid = require('uniqid')

const employees = [
    { id: '1', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' },
    { id: '2', name: 'rony', email: 'dgdd@ta.com', address: 'fhsdkflah', phone: '79875912' },
    { id: '3', name: 'alex', email: 'alex@ta.com', address: 'fhsdkflah', phone: '79875912' }
]

const loadEmployees = (req, res, next) => {
    res.json({employees})
    next()
}

const postEmployee = (req, res, next) => {
	let data = req.body
	if (data) {
		data.id = uniqid()
		employees.push(data)
		res.status('201').json(`recibido con el id ${data.id}`)
	} else {
		res.status('400').json('fijate que pusiste mal los datos, ameo.')
	}
	next()
}

const getEmployeeByID = (req, res, next) => {
    let searchResult = employees.find(e => e.id === req.params.id)
    if (searchResult) {
        res.json(searchResult)
    } else {
        res.status(404).send('No existe tal usuario')
	}
	next()
}

const patchEmployee = (req, res, next) => {
	let data = req.body
	let searchResult = employees.find(e => e.id === req.params.id)
	let index = employees.findIndex(e => e.id === req.params.id)

	if (searchResult) {
		let editedEmployee = {...searchResult, ...data}
		editedEmployee.id = uniqid()
		employees.splice(1, index)
		employees.push(editedEmployee)
		res.json('usuario editado')
	} else {
		res.status(404).send('no encontramos al usuario');
	}
	next()
}

const deleteEmployee = (req, res, next) => {
	let searchResult = employees.find(e => e.id === req.params.id)
	let index = employees.findIndex(e => e.id === req.params.id)
	if (searchResult) {
		employees.splice(index, 1)
		res.status('201').json('Se eliminó el empleado')
	} else {
		res.send('No se pudo eliminar el empleado')
	}
	next()
}

module.exports = {loadEmployees, postEmployee, getEmployeeByID, patchEmployee, deleteEmployee}