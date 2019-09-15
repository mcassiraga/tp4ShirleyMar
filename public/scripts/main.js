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
}

// MODAL ELIMINAR EMPLEADO
const toggleDeleteModal = () => {
    let modal = document.getElementById('deleteEmployeeModal')
    let closeButton = document.querySelector(".close-delete-button")
    modal.classList.toggle("show-modal")

    const windowOnClick = event => {
        if (event.target === modal) {
            toggleDeleteModal()
        }
    }

    closeButton.addEventListener("click", toggleDeleteModal)
    window.addEventListener("click", windowOnClick)
}

// MODAL EDITAR EMPLEADO
const toggleEditModal = () => {
    let modal = document.getElementById('editEmployeeModal')
    let closeButton = document.querySelector(".close-edit-button")
    modal.classList.toggle("show-modal")

    const windowOnClick = event => {
        if (event.target === modal) {
            toggleEditModal()
        }
    }

    closeButton.addEventListener("click", toggleEditModal)
    window.addEventListener("click", windowOnClick)
}