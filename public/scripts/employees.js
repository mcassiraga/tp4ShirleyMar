const initialize = () => {
    getEmployees()
}

const getEmployees = () => {
    fetch('/api/employee-db')
    .then(res => res.json())
    .then(res => printEmployees(res.employees))
}

const printEmployees = data => {
    const container = document.getElementById('employeeList')
    container.innerHTML = ''
    data.forEach(e => container.innerHTML += createElements(e))
}

const createElements = ({name, email, address, phone}) => `
  <tr>
    <td>
        <span class="custom-checkbox">
            <input type="checkbox">
            <label for=""></label>
        </span>
    </td>
    <td>${name}</td>
    <td>${email}</td>
    <td>${address}</td>
    <td>${phone}</td>
    <td class="option-btns">
        <a class="edit" onclick="toggleEditModal()">
            <i class="material-icons" title="Editar">&#xE254;</i>
        </a>
        <a class="delete" onclick="toggleDeleteModal()">
            <i class="material-icons" title="Eliminar">&#xE872;</i>
        </a>
    </td>
  </tr>
`

// VALIDAR DATOS
const validateForm = () => {
    const form = document.getElementById('form')
    const {name, email, address, phone} = form
    const payload = {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: phone.value
    }

    addEmployee(payload)
}

// CREAR EMPLEADOS
const addEmployee = payload => {
    event.preventDefault()

    fetch('/api/employee-db', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })
        .then(res => res.json())
        .then(res => {
            console.log(res)
            name.value = ''
            email.value = ''
            address.value = ''
            phone.value = ''
            initialize()
            toggleModal()
        })
        .catch(error => {
            // acá van otras cositas
        });
}

// EDITAR EMPLEADOS
const editEmployee = (id, payload) => {
    const form = document.getElementById('form')
    const {name, email, address, phone} = form

	fetch(`/api/employee-db/${id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(payload)
	})
		.then(res => res.json())
		.then(res => {
			console.log(res);
			name.value = ''
            email.value = ''
            address.value = ''
            phone.value = ''
            toggleEditModal()
			initialize()
		})
		.catch(error => {
			// acá van otras cositas
		})
}

// ELIMINAR EMPLEADO
const deleteEmployee = (id) => {
    fetch(`/api/employee-db/${id}`, {
        method: 'DELETE',
    })
}

// FILTRAR EMPLEADOS
const handleKeyPress = event => {
    if (event.code === 'Enter') {
        filterEmployees() // hay que armar esta funcion
    }
}