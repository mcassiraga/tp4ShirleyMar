const uniqid = require('uniqid')

const employees = [
    { id: '1', name: 'Calixta Ochoa', email: 'calixtao@hotmail.com', address: '61 Pond St, Natick, Massachusetts', phone: '5086553453672' },
    { id: '2', name: 'Martín Gómez', email: 'gomezmartin@gmail.com', address: '12033 Falcon Rd, Crandall, Texas', phone: '7987591292475' },
    { id: '3', name: 'Alejandra Fernández', email: 'alejandrag@gmail.com', address: '25203 Golf Lake Cir, Bonita Springs, Florida', phone: '1224398344577' }
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
		res.status('404').json('Ningún resultado')
	}
	next()
}

const postEmployee = (req, res, next) => {
	let data = req.body
	if (data) {
		data.id = uniqid()
		employees.push(data)
		res.status('201').json(`Recibido con el id ${data.id}`)
	} else {
		res.status('400').send('Revise los datos')
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
		res.status('201').json('Usuario editado')
	} else {
		res.status('404').send('No encontramos al usuario');
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