const clearModal = () => {
    const form = document.getElementById('form')
    const {name, email, address, phone} = form

    name.value = ''
    email.value = ''
    address.value = ''
    phone.value = ''
}

// MODAL NUEVO EMPLEADO
const toggleModal = () => {
    let modal = document.getElementById("newEmployeeModal")
    let closeButton = document.querySelector(".close-button")
    modal.classList.toggle("show-modal")

    const windowOnClick = event => {
        if (event.target === modal) {
            toggleModal()
        }
    }

    closeButton.addEventListener("click", toggleModal)
    window.addEventListener("click", windowOnClick)
    clearModal()
}

// MODAL ELIMINAR EMPLEADO
const toggleDeleteModal = id => {
    let modal = document.getElementById('deleteEmployeeModal')
    let deleteBtn = document.getElementById('btn-delete')
    let closeButton = document.querySelector(".close-delete-button")
    modal.classList.toggle("show-modal")
    deleteBtn.onclick = () => deleteEmployee(id)

    const windowOnClick = event => {
        if (event.target === modal) {
            toggleDeleteModal(id)
        }
    }

    closeButton.addEventListener("click", toggleDeleteModal)
    window.addEventListener("click", windowOnClick)
}

// MODAL EDITAR EMPLEADO
const toggleEditModal = id => {
    let modal = document.getElementById('editEmployeeModal')
    let editBtn = document.getElementById('btn-edit')
    let closeButton = document.querySelector(".close-edit-button")
    modal.classList.toggle("show-modal")
    editBtn.onclick = () => editEmployee(id)

    const windowOnClick = event => {
        if (event.target === modal) {
            toggleEditModal(id)
        }
    }

    closeButton.addEventListener("click", toggleEditModal)
    window.addEventListener("click", windowOnClick)
    
    fetch(`/api/employee-db/${id}`)
        .then(res => res.json())
        .then(res => fillEditModal(res))  
}


const fillEditModal = data => {
    const form = document.getElementById('edit-form')
    const {name, email, address, phone} = form

    name.value = data.name
    email.value = data.email
    address.value = data.address
    phone.value = data.phone
}