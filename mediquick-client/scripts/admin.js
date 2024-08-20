
var apiUsers = localHostAPI + 'api/Users';
var apiReadQuestion = localHostAPI + 'ReadQuestions';
var geminiAPI = localHostAPI + 'Gemini';
var apiQuestion = localHostAPI + 'api/Questions/';
var apiUpdateUserDetails = localHostAPI + 'updateUserDetails';
var apiUpdateQuestionDetails = localHostAPI + 'updateQuestionDetails';
var topicApi = localHostAPI + 'api/Topics';
let topicToShow;
$(document).ready(function () {
    $('.toggle-row-btn').click(function () {
        $(this).find('i').toggleClass('fa-chevron-down fa-chevron-up');
        $(this).closest('tr').next().toggle();
    });
});

//$("#addQuestionForm").submit(addQuestionToGemini)

//user

function getUsersDataTable() {
    document.getElementById("renderQuestionTableAgain").style.display = "none";
    ajaxCall("GET", apiUsers, "", usersTableGetSCB, usersTableGetECB);
    return false;
}
function usersTableGetSCB(usersList) {
    $("#QuestionForm").css("visibility", "collapse");
    $("#UsersForm").css("visibility", "visible");
    $("#manageUsersBtn").prop("disabled", true);
    $("#manageQuestionsBtn").prop("disabled", false);

    users = usersList; // keep the cars array in a global variable;
    try {
        $('#usersTable').DataTable().destroy();
        tbl = $('#usersTable').DataTable({
            data: usersList,
            pageLength: 10,
            columns: [
                { data: "userID" },
                { data: "firstName" ,editable: true },
                { data: "lastName", editable: true },
                { data: "email", editable: true },
                { data: "password", editable: true },
                { data: "phoneNumber", editable: true },
                {
                    data: "isActive",
                    render: function (data, type, row, meta) {
                        if (data == true)
                            return '<input type="checkbox" checked onclick="changeUserStatus(this)"/>';
                        else
                            return '<input type="checkbox" onclick="changeUserStatus(this)"/>';
                    }
                },
                {
                    data: "isAdmin",
                    render: function (data, type, row, meta) {
                        if (data == true)
                            return '<input type="checkbox" checked onclick="changeUserAdminStatus(this)"/>';
                        else
                            return '<input type="checkbox" onclick="changeUserAdminStatus(this)"/>';
                    }
                },

                {
                    data: null, // This column does not map to a property in the data
                    render: function (data, type, row, meta) {
                        return '<button type="button" class="edit-user-row" onclick=editUserRow(this); return false;>ערוך</button>';
                    }
                },
            ],
            language: {
                processing: "מעבד...",
                search: "חפש:",
                lengthMenu: "הצג _MENU_ פריטים",
                info: "מציג _START_ עד _END_ מתוך _TOTAL_ פריטים",
                infoEmpty: "מציג 0 עד 0 מתוך 0 פריטים",
                infoFiltered: "(מסונן מתוך _MAX_ פריטים)",
                infoPostFix: "",
                loadingRecords: "טוען...",
                zeroRecords: "לא נמצאו רשומות תואמות",
                emptyTable: "אין נתונים זמינים בטבלה",
                paginate: {
                    first: "ראשון",
                    previous: "קודם",
                    next: "הבא",
                    last: "אחרון"
                }
            }
        });
      
    }
    catch (err) {
        alert(err);
    }
}
function usersTableGetECB(err) {
    alert("Error: " + err);
}



//change User Status
function changeUserStatus(user) {
    userEmail = user.parentElement.parentElement.children[3].innerHTML;
    if (user.checked) {
        newStatus = true;
    } else {
        newStatus = false;
    }
    let address = apiUsers + `/email/${userEmail}/newStatus/${newStatus}`;
    ajaxCall("POST", address, "", changeUserStatusPostSCB,changeUserStatusPostECB);
}
function changeUserStatusPostSCB(answer) {
    alert(answer);
}
function changeUserStatusPostECB(err) {
    alert("Error: " + err);
}

//change admin status
function changeUserAdminStatus(user) {
    userEmail = user.parentElement.parentElement.children[3].innerHTML;
    if (user.checked) {
        newAdminStatus = true;
    } else {
        newAdminStatus = false;
    }
    let address = apiUsers + `/email/${userEmail}/newAdminStatus/${newAdminStatus}`;
    ajaxCall("POST", address, "", usersTablePostSCB, usersTablePostECB);
}
function usersTablePostSCB(answer) {
    alert(answer);
}
function usersTablePostECB(err) {
    alert("Error: " + err);
}



function editUserRow(item) {

    let editUserModal = document.getElementById("EditUserModal");

    // When the user clicks the button, open the modal
    
    editUserModal.style.display = "block";

    document.getElementById('email').value = item.parentElement.parentElement.children[3].textContent;  
    document.getElementById('first-name').value = item.parentElement.parentElement.children[1].textContent;  
    document.getElementById('last-name').value = item.parentElement.parentElement.children[2].textContent;  
    document.getElementById('password').value = item.parentElement.parentElement.children[4].textContent;  
    document.getElementById('phone-number').value = item.parentElement.parentElement.children[5].textContent; 
} 

$("#editUserModal").submit(function (event) {
    event.preventDefault(); // למנוע מהטופס להגיש בצורה רגילה
    email = document.getElementById('email').value;
    UpdateUserDetailsFormSubmit(email);
});

function UpdateUserDetailsFormSubmit(userEmail) {
    // if(!validateForm()) {
    //     return false;
    // }
    
    updateUserDetails = {
        firstName: $("#first-name").val(),
        lastName: $("#last-name").val(),
        email: userEmail,
        password: $("#password").val(),
        phoneNumber: $("#phone-number").val()
    }

    ajaxCall("Put", apiUpdateUserDetails, JSON.stringify(updateUserDetails), updateUserPostSCB, updateUserPostECB)
}

function updateUserPostSCB(data){
    if(data){
        alert("השינוי התעדכן בהצלחה!");
        ajaxCall("GET", apiUsers, "", usersTableGetSCB, usersTableGetECB);  

    }
    else{
        alert("השינוי לא הצליח");
    }

    let editUserModal = document.getElementById("EditUserModal");

    editUserModal.style.display = "none";
}

function updateUserPostECB(err){
    alert(err);
}

// function validateForm() {
//     var email = $("#email").val();
//     var firstName = $("#first-name").val();
//     var lastName = $("#last-name").val();
//     var phoneNumber = $("#phone-number").val();
//     var password = $("#password").val();
//     var confirmPassword = $("#confirm-password").val();

//     // Email validation using regex
//     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email.match(emailRegex)) {
//         alert("Invalid email address. Example: ex@123.com");
//         return false;
//     }

//     // First Name and Last Name validation using regex
//     var nameRegex = /^[A-Za-z]+$/;
//     if (!firstName.match(nameRegex)) {
//         alert("Invalid First Name. Name should contain only letters");
//         return false;
//     }
//     if (!lastName.match(nameRegex)) {
//         alert("Invalid Last Name. Name should contain only letters");
//         return false;
//     }

//     // Phone Number validation using regex
//     var phoneRegex = /^\d{10}$/; // Assuming a 10-digit phone number
//     if (!phoneNumber.match(phoneRegex)) {
//         alert("Invalid phone number. Number shuld contain 10 digits only");
//         return false;
//     }

//     // Password validation using regex
//     // At least 8 characters, at least one uppercase letter, one lowercase letter, one number, and one special character
//     var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
//     if (!password.match(passwordRegex)) {
//         alert("Invalid password. Password should cotain at least 1 capital latter, 1 regular latter, 1 number, 1 symbol and atleast 8 characters");
//         return false;
//     }

//     // Confirm Password validation
//     if (password !== confirmPassword) {
//         alert("Passwords do not match");
//         return false;
//     }

//     return true;
// }




//question
function getQuestisonsDataTable() {
    ajaxCall("GET", apiReadQuestion, "", questionsTableGetSCB, questionsTableGetECB);
}
//////
var disableOrdering = false;
function questionsTableGetSCB(questionsList) {
    $("#QuestionForm").css("visibility", "visible");
    $("#UsersForm").css("visibility", "collapse");
    $("#manageUsersBtn").prop("disabled", false);
    $("#manageQuestionsBtn").prop("disabled", true);
    questins = questionsList; // keep the questions array in a global variable;

    try {
        $('#QuestionTable').DataTable().destroy();
        tbl = $('#QuestionTable').DataTable({
            data: questionsList,
            pageLength: 10,
            ordering: !disableOrdering, // Disable ordering if disableOrdering is true
            columns: [
                { data: "questionSerialNumber" },
                { data: "content" },
                { data: "correctAnswer" },
                { data: "wrongAnswer1" },
                { data: "wrongAnswer2" },
                { data: "wrongAnswer3" },
                { data: "explanation" },
                { data: "topic" },
                { data: "difficulty" },
                {
                    data: "status",
                    render: function (data, type, row, meta) {
                        if (data == 1)
                            return `<select class="myList" onchange="changeQuestionStatus(this.parentElement.parentElement)">
                                        <option value="מאושר" selected>מאושר</option>
                                        <option value="ממתין">ממתין</option>
                                        <option value="נדחה">נדחה</option>                                                    
                                    </select>`;
                        else if (data == 0) {
                            return `<select class="myList" onchange="changeQuestionStatus(this.parentElement.parentElement)">
                                        <option value="מאושר">מאושר</option>
                                        <option value="ממתין" selected>ממתין</option>
                                        <option value="נדחה">נדחה</option>
                                    </select>`;
                        } else {
                            return `<select class="myList" onchange="changeQuestionStatus(this.parentElement.parentElement)">
                                        <option value="מאושר">מאושר</option>
                                        <option value="ממתין">ממתין</option>
                                        <option value="נדחה" selected>נדחה</option>
                                    </select>`;
                        }
                    }
                },
                { data: "creator" },
                // { data: "totalAnswers" },
                // { data: "totalCorrectAnswers" },
                {
                    data: null,
                    render: function (data, type, row, meta) {
                        return '<button type="button" title="לחץ כאן על מנת לערוך שאלה זו" class="edit-user-row" onclick=editQuestionRow(this)>ערוך</button>';
                    }
                },
                {
                    data: null,
                    render: function (data, type, row, meta) {
                        return '<button type="button" title="לחץ כאן על מנת לייבא את השאלות הדומות ביותר לשאלה זו" class="Check-similarity-level" onclick=CheckSimilarityLevel(this)> בדוק דמיון</button>';
                    }
                },
            ],
            language: {
                processing: "מעבד...",
                search: "חפש:",
                lengthMenu: "הצג _MENU_ פריטים",
                info: "מציג _START_ עד _END_ מתוך _TOTAL_ פריטים",
                infoEmpty: "מציג 0 עד 0 מתוך 0 פריטים",
                infoFiltered: "(מסונן מתוך _MAX_ פריטים)",
                loadingRecords: "טוען...",
                zeroRecords: "לא נמצאו רשומות תואמות",
                emptyTable: "אין נתונים זמינים בטבלה",
                paginate: {
                    first: "ראשון",
                    previous: "קודם",
                    next: "הבא",
                    last: "אחרון"
                }
            }
        });

        tbl.rows().every(function (rowIdx, tableLoop, rowNode) {
            var data = this.data();
            if (data.value == 1) {
                $(this.node()).css('border', '3px solid #03a696');
            }
            data.value = 0;

        });


    } catch (err) {
        alert(err);
    }
}
/////
function questionsTableGetECB(err) {
    alert("Error: " + err);
}

//Check-similarity-level
function CheckSimilarityLevel(item) {
    showSpinner();
    var idQuestionToCheck = item.parentElement.parentElement.children[0].innerHTML;
    var topicQuestionToCheck = item.parentElement.parentElement.children[7].innerHTML;
    topicToShow = item.parentElement.parentElement.children[7].innerHTML;
    var apiQuestionByTopic = localHostAPI + 'api/Questions/qId/';
    apiQuestionByTopic = apiQuestionByTopic + idQuestionToCheck + '/topicName/' + topicQuestionToCheck;
    stringStatus = item.parentElement.parentElement.children[9].firstElementChild.value;
    if (stringStatus == 'מאושר') {
        intStatus = 1;
    }
    else if (stringStatus == 'ממתין') {
        intStatus = 0;
    }
    else if (stringStatus == 'נדחה') {
        intStatus = -1;
    }
    QuestionToCheck= {
        questionSerialNumber: idQuestionToCheck,
        content: item.parentElement.parentElement.children[1].innerHTML
        //correctAnswer: item.parentElement.parentElement.children[2].innerHTML,
        //wrongAnswer1: item.parentElement.parentElement.children[3].innerHTML,
        //wrongAnswer2: item.parentElement.parentElement.children[4].innerHTML,
        //wrongAnswer3: item.parentElement.parentElement.children[5].innerHTML,
        //explanation: item.parentElement.parentElement.children[6].innerHTML    
        //topic: item.parentElement.parentElement.children[7].innerHTML,     
        //difficulty: item.parentElement.parentElement.children[8].innerHTML,     
        //status: intStatus,
        //creator: item.parentElement.parentElement.children[10].innerHTML,     
        //totalAnswers: item.parentElement.parentElement.children[11].innerHTML,     
        //totalCorrectAnswers: item.parentElement.parentElement.children[12].innerHTML
    }
    stringQuestionToCheck = JSON.stringify(QuestionToCheck);
    ajaxCall("GET", apiQuestionByTopic, '', function (data) {
        getQuestionByTopicGetSCB(stringQuestionToCheck, data);
    }, getQuestionByTopicGetECB);
}

function getQuestionByTopicGetSCB(stringQuestionToCheck, data) {

    listOfQuestions = JSON.stringify(data);
    textToGemini = `תספק לי רמת דמיון סמנטי בין ${stringQuestionToCheck} ל-${listOfQuestions} - תבדוק את רמת הדמיון לפי תוכן השאלה (CONTENT). תן לי את התשובה בדירוג רמת דמיון באחוזים מהגבוה לנמוך. החזר את חמש השאלות עם הדירוג הכי גבוה, אך לא לכלול את השאלה הנבדקת עצמה בתוצאות. התשובה תהיה במבנה הבא:

json{
  "questionToCheck": {
    "questionSerialNumber": "", "Content": ""
  },
  topQuestions: [
            {   'questionSerialNumber' 'Content'},                      
            {   'questionSerialNumber' 'Content'},                      
            {   'questionSerialNumber' 'Content'}                      
  ]
}`;

    var geminiForSimilarity = localHostAPI + 'GeminiForSimilarity'; 
    ajaxCall("POST", geminiForSimilarity, JSON.stringify(textToGemini), geminiForSimilaritySCB, geminiForSimilarityECB);

}

function getQuestionByTopicGetECB(data) {
    document.getElementById('spinner').style.display = 'none';
    console.log('ERROR');
}
//json{
//    "questionToCheck": {
//        "questionSerialNumber": "", "Content": "", "CorrectAnswer": "",
//            "WrongAnswer1": "", "WrongAnswer2": "", "WrongAnswer3": "",
//                "Explanation": "", "topic": "", "difficulty": "",
//                    "status": "", "creator": "", "totalAnswers": "", "totalCorrectAnswers": ""
//    },
//    topQuestions: [
//        {
//            'questionSerialNumber' 'Content' 'CorrectAnswer' 'WrongAnswer1'
//            'WrongAnswer2' 'WrongAnswer3' 'Explanation' 'topic' 'difficulty' 'status' 
//            'creator' 'totalAnswers' 'totalCorrectAnswers'},
//        {
//            'questionSerialNumber' 'Content' 'CorrectAnswer' 'WrongAnswer1'
//            'WrongAnswer2' 'WrongAnswer3' 'Explanation' 'topic' 'difficulty' 'status' 
//            'creator' 'totalAnswers' 'totalCorrectAnswers'},
//        {
//            'questionSerialNumber' 'Content' 'CorrectAnswer' 'WrongAnswer1'
//            'WrongAnswer2' 'WrongAnswer3' 'Explanation' 'topic' 'difficulty' 'status' 
//            'creator' 'totalAnswers' 'totalCorrectAnswers'}
//    ]
//}`;

//function splitArray(array, chunkSize) {
//    let result = [];
//    for (let i = 0; i < array.length; i += chunkSize) {
//        let chunk = array.slice(i, i + chunkSize);
//        result.push(chunk);
//    }
//    return result;
//}
//function sleep(ms) {
//    return new Promise(resolve => setTimeout(resolve, ms));
//}

//async function getQuestionByTopicGetSCB(stringQuestionToCheck, data) {
//    const splitData = splitArray(data, 20); // מחלקים את המערך למערכים קטנים של עד 20 שאלות
//    let combinedResults = [];

//    for (let chunk of splitData) {
//        try {
//            let result = await sendToGeminiForSimilarity(stringQuestionToCheck, chunk);
//            combinedResults = combinedResults.concat(result.topQuestions);
//            await sleep(2000); // מחכה 2 שניות לפני שליחת הבקשה הבאה
//        } catch (error) {
//            console.error("Error in processing chunk:", error);
//            alert("Error in processing chunk, please try again later.");
//            return;
//        }
//    }

//    // שליחת התוצאות המשולבות לבדיקה סופית בגמיני
//    sendFinalComparisonToGemini(stringQuestionToCheck, combinedResults);
//}

//function sendToGeminiForSimilarity(stringQuestionToCheck, chunk) {
//    return new Promise((resolve, reject) => {
//        const textToGemini = `תספק לי רמת דמיון סמנטי בין ${stringQuestionToCheck} ל-${JSON.stringify(chunk)} - תבדוק את רמת הדמיון לפי תוכן השאלה (CONTENT). תן לי את התשובה בדירוג רמת דמיון באחוזים מהגבוה לנמוך. החזר את שתי השאלות עם הדירוג הכי גבוה, אך לא לכלול את השאלה הנבדקת עצמה בתוצאות. התשובה תהיה במבנה הבא:

//        json{
//          "questionToCheck": {
//            "questionSerialNumber": "", "Content": "", "CorrectAnswer": "",
//            "WrongAnswer1": "", "WrongAnswer2": "", "WrongAnswer3": "",
//            "Explanation": "", "topic": "", "difficulty": "",
//            "status": "", "creator": "", "totalAnswers": "", "totalCorrectAnswers": ""
//          },
//          topQuestions: [
//                    {   'questionSerialNumber' 'Content' 'CorrectAnswer' 'WrongAnswer1'
//                    'WrongAnswer2' 'WrongAnswer3' 'Explanation' 'topic' 'difficulty' 'status' 
//                    'creator' 'totalAnswers' 'totalCorrectAnswers'},  
//                    {   'questionSerialNumber' 'Content' 'CorrectAnswer' 'WrongAnswer1'
//                    'WrongAnswer2' 'WrongAnswer3' 'Explanation' 'topic' 'difficulty' 'status' 
//                    'creator' 'totalAnswers' 'totalCorrectAnswers'} 
//          ]
//        }`;

//        let geminiForSimilarity = localHostAPI + 'GeminiForSimilarity';
//        ajaxCall("POST", geminiForSimilarity, JSON.stringify(textToGemini), data => resolve(data), error => reject(error));
//    });
//}

//function sendFinalComparisonToGemini(stringQuestionToCheck, combinedResults) {
//    const textToGemini = `תספק לי רמת דמיון סמנטי בין ${stringQuestionToCheck} ל-${JSON.stringify(combinedResults)} - תבדוק את רמת הדמיון לפי תוכן השאלה (CONTENT). תן לי את התשובה בדירוג רמת דמיון באחוזים מהגבוה לנמוך. החזר את שלוש השאלות עם הדירוג הכי גבוה, אך לא לכלול את השאלה הנבדקת עצמה בתוצאות. התשובה תהיה במבנה הבא:

//    json{
//      "questionToCheck": {
//        "questionSerialNumber": "", "Content": "", "CorrectAnswer": "",
//        "WrongAnswer1": "", "WrongAnswer2": "", "WrongAnswer3": "",
//        "Explanation": "", "topic": "", "difficulty": "",
//        "status": "", "creator": "", "totalAnswers": "", "totalCorrectAnswers": ""
//      },
//      topQuestions: [
//                {   'questionSerialNumber' 'Content' 'CorrectAnswer' 'WrongAnswer1'
//                'WrongAnswer2' 'WrongAnswer3' 'Explanation' 'topic' 'difficulty' 'status' 
//                'creator' 'totalAnswers' 'totalCorrectAnswers'},  
//                {   'questionSerialNumber' 'Content' 'CorrectAnswer' 'WrongAnswer1'
//                'WrongAnswer2' 'WrongAnswer3' 'Explanation' 'topic' 'difficulty' 'status' 
//                'creator' 'totalAnswers' 'totalCorrectAnswers'}, 
//                {   'questionSerialNumber' 'Content' 'CorrectAnswer' 'WrongAnswer1'
//                'WrongAnswer2' 'WrongAnswer3' 'Explanation' 'topic' 'difficulty' 'status' 
//                'creator' 'totalAnswers' 'totalCorrectAnswers'}                     
//      ]
//    }`;

//    let geminiForFinalComparison = localHostAPI + 'GeminiForSimilarity';
//    ajaxCall("POST", geminiForFinalComparison, JSON.stringify(textToGemini), geminiForSimilaritySCB, geminiForSimilarityECB);
//}



function geminiForSimilaritySCB(data) {
    let questionsArray = [];
    questionsArray.push(data.questionToCheck.questionSerialNumber);
    for (var i = 0; i < data.topQuestions.length; i++) {
        questionsArray.push(data.topQuestions[i].questionSerialNumber);
    }
    apiGetQuestionDetails = localHostAPI + 'api/Questions/GetQuestionsDetailsFromArray';
    ajaxCall("POST", apiGetQuestionDetails, JSON.stringify(questionsArray), GetQuestionDetailsPostSCB, GetQuestionDetailsPostECB)

    //document.getElementById('spinner').style.display = 'none';
    //let combinedQuestions = data.topQuestions;
    //data.questionToCheck.value = 1;
    //combinedQuestions.unshift(data.questionToCheck);
    //document.getElementById("renderQuestionTableAgain").style.display = "block";
    //for (var i = 1; i < combinedQuestions.length; i++) {
    //    combinedQuestions[i].topic = combinedQuestions[0].topic;
    //}
    ////questionsTableGetSCB(combinedQuestions);
    ////questionsTableGetSCB(combinedQuestions, true); // Send true to disable ordering
    //disableOrdering = true; // Disable ordering for this specific case
    //questionsTableGetSCB(combinedQuestions);
    //disableOrdering = false; // Reset the ordering to default after rendering
}

function GetQuestionDetailsPostSCB(data) {
    document.getElementById('spinner').style.display = 'none';
    for (var i = 0; i < data.length; i++) {
        data[i].topic = topicToShow;
    }
    data[0].value = 1;
    document.getElementById("renderQuestionTableAgain").style.display = "block";
    disableOrdering = true; // Disable ordering for this specific case
    questionsTableGetSCB(data);
    disableOrdering = false; // Reset the ordering to default after rendering
}
function GetQuestionDetailsPostECB(err) {
    console.log("שליפת נתוני השאלות נכשלה");
}

function renderQuestionTableAgain() {
    document.getElementById("renderQuestionTableAgain").style.display = "none";
    getQuestisonsDataTable();
}

function geminiForSimilarityECB(err) {
    console.log("בעיה בבדיקת שאלות דומות");
}

//edit question modal
function editQuestionRow(item) {

    let editQuestionModal = document.getElementById("EditQuestionModal");

    $.ajax({
        url: topicApi, method: 'GET',
        success: function (data) {
            var topicSelect = $('#topicSelect');
            $('#topicSelect').empty();
            data.forEach(function (topic) {
                topicSelect.append(new Option(topic.topicName, topic.topicId));
            });
            topicsLoaded = true;

            editQuestionModal.style.display = "block";

            document.getElementById('qSerialNumber').value = item.parentElement.parentElement.children[0].textContent;
            document.getElementById('content').value = item.parentElement.parentElement.children[1].textContent;
            document.getElementById('rightAnswer').value = item.parentElement.parentElement.children[2].textContent;
            document.getElementById('wrongAnswer1').value = item.parentElement.parentElement.children[3].textContent;
            document.getElementById('wrongAnswer2').value = item.parentElement.parentElement.children[4].textContent;
            document.getElementById('wrongAnswer3').value = item.parentElement.parentElement.children[5].textContent;
            document.getElementById('explanation').value = item.parentElement.parentElement.children[6].textContent;
            //document.getElementById('topicSelect').value = item.parentElement.parentElement.children[7].textContent;
            var topicText = item.parentElement.parentElement.children[7].textContent;
            var topicSelect = $('#topicSelect');

            // Find the option with the specific text and set it as selected
            var found = false;
            topicSelect.children('option').each(function () {
                if ($(this).text() === topicText) {
                    $(this).prop('selected', true);
                    found = true;
                    return false; // Exit the loop once the item is found
                }
            });

        },
        error: function (err) {
            console.error('Failed to load topics:', err);

        }
    });

}  
    // When the user clicks the button, open the modal

    $("#EditQuestionModal").submit(function (event) {
        console.log(10);
        event.preventDefault(); // למנוע מהטופס להגיש בצורה רגילה
        console.log(20);
        var qSerialNumber = document.getElementById('qSerialNumber').value
        UpdateQuestionDetailsFormSubmit(qSerialNumber);
    });



function UpdateQuestionDetailsFormSubmit(qSerialNumber) {
    updateQuestionDetails = {
        questionSerialNumber: qSerialNumber,
        content: $("#content").val(),
        correctAnswer: $("#rightAnswer").val(), 
        wrongAnswer1: $("#wrongAnswer1").val(),
        wrongAnswer2: $("#wrongAnswer2").val(),
        wrongAnswer3: $("#wrongAnswer3").val(),
        explanation: $("#explanation").val(),
        creator: "0",
        topic: document.getElementById("topicSelect").selectedOptions[0].value 
    }
    ajaxCall("PATCH", apiUpdateQuestionDetails, JSON.stringify(updateQuestionDetails), updateQuestionPostSCB, updateQuestionPostECB)
}


function updateQuestionPostSCB(data) {
    if (data) {
        alert("השינוי התעדכן בהצלחה!");
        ajaxCall("GET", apiReadQuestion, "", questionsTableGetSCB, questionsTableGetECB);

    }
    else {
        alert("השינוי לא הצליח");
    }

    let editQuestionModal = document.getElementById("EditQuestionModal");

    editQuestionModal.style.display = "none";
}

function updateQuestionPostECB(err) {
    alert("כוסעמק");
}


//cahnge question status
function changeQuestionStatus(row) {
    newStatus = row.children[9].firstElementChild.value;
    if (newStatus == 'מאושר') {
        changedStatus = 1;
    }
    else if (newStatus == 'ממתין') {
        changedStatus = 0;
    }
    else {
        changedStatus = -1;
    }
    id = row.firstChild.innerHTML;
    let address = apiQuestion + `id/${id}`;
    ajaxCall("PUT", address, JSON.stringify(changedStatus), changeQuestionStatusSCB, changeQuestionStatusECB);
}
function changeQuestionStatusSCB(response) {
    alert("השאלה עודכנה בהצלחה");
}
function changeQuestionStatusECB(err) {
    alert("שגיאת תקשורת עם השרת");
}



//gemini
function addQuestionToGemini() {

    selectedTopic = document.getElementById("topicSelectToGemini").selectedOptions[0].value;
    console.log(selectedTopic);

    orderToGemini = `תייצר לי ${$("#numOfQuestions").val()} שאלות אמריקאיות עם 4 תשובות. בפורמט JSON עם השדות הבאים: 
    'Content'
    'CorrectAnswer'
    'WrongAnswer1'
    'WrongAnswer2'
    'WrongAnswer3'
    'Explanation'
'topic'
כאשר ה 'topic'  יכיל את: ${selectedTopic} כמספר (INT)
        השאלות יתבססו על הטקסט הבא: ${$("#textInput").val()} 
     אני מעוניין בהסברים מקצועיים ללא הפניות לטקסט המקורי. ההסברים צריכים להיות ברורים,
     תמציתיים ומנומקים היטב. אשמח אם תסביר את התשובה הנכונה תוך שימוש במושגים רלוונטיים מתחום הידע.
     אל תכלול גרשיים בטקסט שבתוך הJSON
     חשוב לי שהתשובות יוצגו בפורמט פשוט, ללא תוספות מיותרות כמו מספור.
     תדאג שכל ערך יהיה עטוף בגרשיים,
     תדאג שהתשובה הנכונה לא תהיה בהכרח הכי ארוכה - שלא יהיה קשר בין אורך השאלה לבין הנכונות שלה`;

     let gptAPI = "https://localhost:7254/Gemini";
    ajaxCall("POST", geminiAPI, JSON.stringify(orderToGemini), GeminiQuestionGetSCB, GeminiQuestionGetECB);
    //ajaxCall("POST", gptAPI, JSON.stringify(orderToGemini), GeminiQuestionGetSCB, GeminiQuestionGetECB);
    return false;
}
function GeminiQuestionGetSCB(data) {
    document.getElementById('spinner').style.display = 'none';
    alert("השאלות נוספו בהצלחה למאגר");
    document.getElementById("myModal").style.display = "none";
    ajaxCall("GET", apiReadQuestion, "", questionsTableGetSCB, questionsTableGetECB);

}
function GeminiQuestionGetECB(err) {

    document.getElementById('spinner').style.display = 'none';
    alert(err.statusText);
}



document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('addQuestionForm');
     
    form.addEventListener('submit', function (event) {
        event.preventDefault();
        showSpinner();
        // כאן תוסיף את הקריאה לפונקציה שמטפלת בשליחת הטופס
        addQuestionToGemini();

    });

});
function showSpinner() {
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'flex';
}
