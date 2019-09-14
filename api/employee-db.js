const employees = [
    { id: '1', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' },
    { id: '1', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' },
    { id: '1', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' }
]

const handler = (req, res, next) => {
    res.json({employees})
    next()
}

const postEmployee = (req, res, next) => {
	let data = req.body;
	if (data) {
		// data.id = users.length + 1; // para el tp, pongamos una generación de ID mas segura.
		employees.push(data);
		res.status('201').json(`recibido con el id ${data.id}`);
	} else {
		res.status('400').json('fijate que pusiste mal los datos, ameo.');
	}
	next();
}

module.exports = {handler, postEmployee}