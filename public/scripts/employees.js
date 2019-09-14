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