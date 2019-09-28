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

const searchEmployees = (req, res, next) => {
	let searchResults = employees.filter(e => Object.keys(e).find(prop => e[prop].includes(req.params.query)))
	if (searchResults.length !== 0) {
		res.json({searchResults})
	} else {
		res.status('404').send('Ningun resultado')
	}
	next()
}

const postEmployee = (req, res, next) => {
	let data = req.body
	if (data) {
		data.id = uniqid()
		employees.push(data)
		res.status('201').json(`recibido con el id ${data.id}`)
	} else {
		res.status('400').send('fijate que pusiste mal los datos, ameo.')
	}
	next()
}

const getEmployeeByID = (req, res, next) => {
    let searchResult = employees.find(e => e.id === req.params.id)
    if (searchResult) {
        res.json(searchResult)
    } else {
        res.status('404').send('No existe tal usuario')
	}
	next()
}

const patchEmployee = (req, res, next) => {
	let data = req.body
	let searchResult = employees.find(e => e.id === req.params.id)
	let index = employees.findIndex(e => e.id === req.params.id)

	if (searchResult) {
		let editedEmployee = {...searchResult, ...data}
		editedEmployee.id = searchResult.id
		employees.splice(index, 1)
		employees.push(editedEmployee)
		res.status('201').json('usuario editado')
	} else {
		res.status('404').send('no encontramos al usuario');
	}
	next()
}

const deleteEmployee = (req, res, next) => {
	let searchResult = employees.find(e => e.id === req.params.id)
	let index = employees.findIndex(e => e.id === req.params.id)
	if (searchResult) {
		employees.splice(index, 1)
		res.status('200').json('Se eliminó el empleado')
	} else {
		res.status('400').send('No se pudo eliminar el empleado')
	}
	next()
}

module.exports = {loadEmployees, searchEmployees, postEmployee, getEmployeeByID, patchEmployee, deleteEmployee}