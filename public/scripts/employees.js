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

const createElements = ({id, name, email, address, phone}) => `
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
        <a class="edit" id="${id}" onclick="toggleEditModal(id)">
            <i class="material-icons" title="Editar">&#xE254;</i>
        </a>
        <a class="delete" id="${id}" onclick="toggleDeleteModal(id)">
            <i class="material-icons" title="Eliminar">&#xE872;</i>
        </a>
    </td>
  </tr>
`

// VALIDAR DATOS
const validateForm = form => {
    const {name, email, address, phone} = form

    if (name.value === null || name.value.length === 0 || /^\s+$/.test(name.value)) {
        alert('ERROR: Ingrese un nombre válido')
        return false
    } else if (!(/\S+@\S+\.\S+/.test(email.value))) {
        alert('ERROR: Ingrese un correo válido')
        return false
    } else if (address.value === null || address.value.length === 0 || /^\s+$/.test(address.value)) {
        alert('ERROR: Ingrese una dirección válida')
        return false
    } else if (!/^\d{13}$/.test(phone.value)) {
        alert('ERROR: Ingrese un número de teléfono de 13 dígitos')
        return false
    } else {
        return true
    }
}

// CREAR EMPLEADOS
const addEmployee = () => {
    event.preventDefault()

    const addForm = document.getElementById('form')
    const {name, email, address, phone} = addForm
    const payload = {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: phone.value
    }

    if (validateForm(addForm)) {
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
                toggleModal()
                getEmployees()
            })
    }
}

// EDITAR EMPLEADOS
const editEmployee = id => {
    const editForm = document.getElementById('edit-form')
    const {name, email, address, phone} = editForm
    const data = {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: phone.value
    }

    if (validateForm(editForm)) {
        fetch(`/api/employee-db/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(res => {
                console.log(res);
                toggleEditModal(id)
                getEmployees()
            })
    }
}

// ELIMINAR EMPLEADO
const deleteEmployee = id => {
    fetch(`/api/employee-db/${id}`, {
        method: 'DELETE',
        headers: {
			'Content-Type': 'application/json'
		}
    })
    .then(res => res.json())
    .then(res => {
        console.log(res)
        toggleDeleteModal()
        getEmployees()
    })
}

// FILTRAR EMPLEADOS
const handleKeyPress = event => {
    let query = event.target.value
    if (event.code === 'Enter' && query.length !== 0) {
        filterEmployees()
    } else if (event.code === 'Enter' && query.length === 0) {
        getEmployees()
    }
}

const filterEmployees = () => {
    let query = document.getElementById('search').value
    fetch(`/api/employee-db/search/${query}`)
        .then(res => res.json())
        .then(res => printEmployees(res.searchResults))
}