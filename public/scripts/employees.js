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

// VALIDAR DATOS - hay que validar dos forms!
const validateForm = () => {
    const form = document.getElementById('form')
    const {name, email, address, phone} = form
    const payload = {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: phone.value
    }


    const txtName = document.getElementById('name').value;
    const txtEmail = document.getElementById('email').value;
    const txtAddress = document.getElementById('address').value;
    const txtPhone = document.getElementById('phone').value;
    
    //Test campo obligatorio
    if(txtName == null || txtName.length == 0 || /^\s+$/.test(txtName)){
        alert('ERROR: El campo nombre no debe ir vacío o lleno de solamente espacios en blanco');
        return false;
    }
    
    //Test correo
    if(!(/\S+@\S+\.\S+/.test(txtEmail))){
        alert('ERROR: Debe escribir un correo válido');
        return false;
    }

    //Test address
    if(txtAddress == null || txtAddress.length == 0 || /^\s+$/.test(txtAddress)){
        alert('ERROR: El campo dirección no debe ir vacío o lleno de solamente espacios en blanco');
        return false;
    }

    //Test phone
    if(!/^\d{8}$/.test(txtPhone)){
        alert('ERROR: Debe ingresar un número de teléfono de 8 dígitos');
        return false;
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
            toggleModal()
            initialize()
        })
        .catch(error => {
            // acá van otras cositas
        });
}

// EDITAR EMPLEADOS
const editEmployee = id => {
    const form = document.getElementById('edit-form')
    const {name, email, address, phone} = form
    const data = {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: phone.value
    }

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
			initialize()
		})
		.catch(error => {
			// acá van otras cositas
		})
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
        initialize()
    })
}

// FILTRAR EMPLEADOS
const handleKeyPress = event => {
    if (event.code === 'Enter') {
        filterEmployees() // hay que armar esta funcion
    }
}

const filterEmployees = () => {
    let query = document.getElementById('search').value
    fetch(`/api/employee-db/search?${query}`)
        .then(res => res.json())
        .then(res => console.log(res))
}