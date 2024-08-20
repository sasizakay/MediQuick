// Get the modal
let EditQuestionModal = document.getElementById("EditQuestionModal");

// Get the <userSpan> element that closes the EditUserModal
var QuestionSpan = document.getElementsByClassName("close")[1];

// When the user clicks on <userSpan> (x), close the EditUserModal
QuestionSpan.onclick = function () {
    EditQuestionModal.style.display = "none";
}

// When the user clicks anywhere outside of the EditUserModal, close it
window.onclick = function (event) {
    if (event.target == EditQuestionModal) {
        EditQuestionModal.style.display = "none";
    }
}
function resetForm() {
    $("#editQuestionForm")[0].reset();
}

