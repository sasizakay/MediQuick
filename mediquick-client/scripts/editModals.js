// Get the modal
let EditUserModal = document.getElementById("EditUserModal");

// Get the <userSpan> element that closes the EditUserModal
var userSpan = document.getElementsByClassName("close")[0];

// Get the modal
let EditQuestionModal = document.getElementById("EditQuestionModal");

// Get the <userSpan> element that closes the EditUserModal
var QuestionSpan = document.getElementsByClassName("close")[1];

// When the user clicks on <userSpan> (x), close the EditUserModal
userSpan.onclick = function () {
    EditUserModal.style.display = "none";
}
QuestionSpan.onclick = function () {
    EditQuestionModal.style.display = "none";
}


// When the user clicks anywhere outside of the EditUserModal, close it
window.onclick = function (event) {
    if (event.target == EditUserModal) {
        EditUserModal.style.display = "none";
    }
    else if (event.target == EditQuestionModal) {
        EditQuestionModal.style.display = "none";
    }
    else if (event.target == GeminiModal) {
        GeminiModal.style.display = "none";
    }
}

function togglePasswordAdmin(element) {
    const box = element.parentElement.firstElementChild;
    if (box.type === 'password') {
        box.type = 'text';
        element.src = "./../images/icons/eye-closed.svg";
    } else {
        box.type = 'password';
        element.src = "./../images/icons/eye-open.svg";
    }
}

function resetForm() {
    $("#editUserModal")[0].reset();
    $("#editQuestionForm")[0].reset();
}

