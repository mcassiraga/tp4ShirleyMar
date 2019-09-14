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
    const formName = document.getElementById('name')
    const formEmail = document.getElementById('email')
    const formAddress = document.getElementById('address')
    const formPhone = document.getElementById('phone')

    const payload = {
        name: formName.value,
        email: formEmail.value,
        address: formAddress.value,
        phone: formPhone.value
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
                formName.value = ''
                formEmail.value = ''
                formAddress.value = ''
                formPhone.value = ''
                initialize()
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