const uniqid = require('uniqid')

const employees = [
    { id: '1', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' },
    { id: '2', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' },
    { id: '3', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' }
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
}

const patchEmployee = (req, res, next) => {
	let data = req.body
	let index = ''
	let resEmployee = employees.find((e, i) => {
		index = i
		return e.id === req.params.id
	})

	if (resEmployee) {
        let editedEmployee = {...resEmployee, ...data}
		employees.splice(1, index)
		employees.push(editedEmployee)
	} else {
		res.status(404).send('no encontramos al usuario');
	}
}

const deleteEmployee = (req, res, next) => {
	res.send('got a delete request')
}

module.exports = {loadEmployees, postEmployee, getEmployeeByID, patchEmployee, deleteEmployee}