console.log('estoy bien linkeado')

    function toggleModal() {
        var modal = document.querySelector(".modal");
        var closeButton = document.querySelector(".close-button");
        modal.classList.toggle("show-modal");
        closeButton.addEventListener("click", toggleModal);
    }