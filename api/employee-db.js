const employees = [
    { id: '1', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' },
    { id: '1', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' },
    { id: '1', name: 'calixta', email: 'calix@ta.com', address: 'fhsdkflah', phone: '79875912' }
]

const handler = (req, res, next) => {
    res.json({employees})
    next()
}

// const addEmployee = (req, res, next) => {

// }

module.exports = handler