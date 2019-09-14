const toggleModal = () => {
    let modal = document.querySelector(".modal");
    let closeButton = document.querySelector(".close-button");
    modal.classList.toggle("show-modal");

    const windowOnClick = event => {
        if (event.target === modal) {
            toggleModal();
        }
    }

    closeButton.addEventListener("click", toggleModal);
    window.addEventListener("click", windowOnClick);
}