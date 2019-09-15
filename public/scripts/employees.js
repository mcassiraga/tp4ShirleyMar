const initialize = () => {
    getEmployees()
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
        <a class="edit">
            <i class="material-icons" title="Editar">&#xE254;</i>
        </a>
        <a class="delete">
            <i class="material-icons" title="Eliminar">&#xE872;</i>
        </a>
    </td>
  </tr>
`

const printEmployees = data => {
    const container = document.getElementById('employeeList')
    container.innerHTML = ' '
    data.forEach(e => container.innerHTML += createElements(e))
}

const getEmployees = () => {
    fetch('/api/employee-db')
    .then(res => res.json())
    .then(res => printEmployees(res.employees))
}

// CREAR EMPLEADOS
const addEmployee = () => {
    event.preventDefault()
    const form = document.getElementById('form')
    const {name, email, address, phone} = form

    const payload = {
        name: name.value,
        email: email.value,
        address: address.value,
        phone: phone.value
    }

    if (payload) {
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
            .catch((error) => {
                // acá van otras cositas
            });
    } else {}
}

// FILTRAR EMPLEADOS
const handleKeyPress = event => {
    if (event.code === 'Enter') {
        filterEmployees() // hay que armar esta funcion
    }
}