//טעינת נושאים למודל
$.ajax({
    url: topicApi, method: 'GET',
    success: function (data) {
        var topicSelectToGemini = $('#topicSelectToGemini');
        $('#topicSelectToGemini').empty();
        data.forEach(function (topic) {
            topicSelectToGemini.append(new Option(topic.topicName, topic.topicId));
        });
        topicsLoaded = true;
    },
    error: function (err) {
        console.error('Failed to load topics:', err);

    }
});

// Get the modal
let GeminiModal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("addQuestionByGemini");

// Get the <span> element that closes the modal
var spanGeminiModal = document.getElementsByClassName("close")[2];

// When the user clicks the button, open the modal
btn.onclick = function () {
    GeminiModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
spanGeminiModal.onclick = function () {
    GeminiModal.style.display = "none";
}


function resetGeminiForm() {
    $("#addQuestionForm")[0].reset();
}

