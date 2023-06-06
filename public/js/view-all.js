const viewAllForm = document.querySelector("#view-all-form")

viewAllForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const destination = document.querySelector("#view-all-choice").value;
    document.location.replace(`/dashboard/collection/${destination}`)
})