const urlParams = new URLSearchParams(window.location.search);
const TESTID = urlParams.get('testId');
var userId = sessionStorage.getItem('id');
var testGrade = urlParams.get('testGrade');
var durationSeconds = urlParams.get('durationSeconds');

if (!userId) {
     userId = urlParams.get('userId');
} 

$(document).ready(function () {
    if (testGrade != undefined) {
        document.getElementById('tesGrade').textContent = testGrade;       
        document.getElementById('tesTime').textContent = formatDuration(durationSeconds);
    }
    else {
        calculateAndUpdateScoreAndGetDuration(TESTID);

    }
    getTestSummary(TESTID);
    getQuestionDetailsInTest(TESTID);
    //saveSammary(TESTID, userId);
    //saveHtmlSummary(TESTID, userId);

});

function calculateAndUpdateScoreAndGetDuration(testId) {
    const apiUrl = `${localHostAPI}api/Tests/CalculateAndUpdateScoreAndGetDuration/${testId}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const { testScore, durationInSeconds } = data;

            document.getElementById('tesGrade').textContent = `${testScore}`;
            document.getElementById('tesTime').textContent = `${formatDuration(durationInSeconds)}`;
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to calculate and update score and duration.');
        });
}

function formatDuration(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    const formattedHours = hours.toString().padStart(2, '0');
    const formattedMinutes = minutes.toString().padStart(2, '0');
    const formattedSeconds = remainingSeconds.toString().padStart(2, '0');

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}




function getTestSummary(testId) {
    const apiUrl = `${localHostAPI}api/Tests/GetTestSummary/${testId}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Populate the table with topic statistics
            const topicsTableBody = document.querySelector('#topics-table tbody');
            topicsTableBody.innerHTML = ''; // Clear existing rows

            data.forEach(topic => {
                const row = document.createElement('tr');
                row.innerHTML = `
                <td>${topic.topicName}</td>
                <td>${topic.totalQuestions}</td>
                <td>${topic.correctAnswers}</td>
                <td>${formatDuration(topic.averageResponseTimeSeconds)}</td>
            `;
                topicsTableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load test summary.');
        });
}

// פונקציה שמבצעת קריאה לשרת לקבלת פרטי השאלות במבחן
function getQuestionDetailsInTest(testId) {
    const apiUrl = `${localHostAPI}api/Tests/GetQuestionDetailsInTest/${testId}`;

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            renderQuestionDetails(data); // קריאה לפונקציה שמציגה את הנתונים
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Failed to load question details.');
        });
}

// פונקציה שמציגה את פרטי השאלות בצורה דינאמית על המסך
function renderQuestionDetails(questions) {
    const container = document.getElementById('question-details-container');
    container.innerHTML = ''; // ניקוי מיכל פרטי השאלות לפני הוספת השאלות החדשות

    let counter = 1;  // התחלת המונה מ-1

    questions.forEach(question => {
        if (question.isAnswerCorrect) {
            var questionCard = `
            <div class="question-card">
                <h4>שאלה מספר: ${counter}</h4>
                <p><strong>תוכן השאלה:</strong> ${question.content}</p>
                <p><strong>נושא:</strong> ${question.topicName}</p>
                <p><strong>רמת קושי:</strong> ${question.difficultyLevel}</p>
                <p><strong>זמן מענה:</strong> ${formatDuration(question.responseTimeSeconds)}</p>
                <p><strong>תשובה שנבחרה:</strong> ${question.answerChosen}</p>
                <p><strong>האם צדק?</strong> ${question.isAnswerCorrect ? 'כן' : 'לא'}</p>            
                <p><strong>הסבר:</strong> ${question.explanation}</p>
            </div>
        
        
    `;
        }
        else {
            var questionCard = `
            <div class="question-card">
                <h4>שאלה מספר: ${counter}</h4>
                <p><strong>תוכן השאלה:</strong> ${question.content}</p>
                <p><strong>נושא:</strong> ${question.topicName}</p>
                <p><strong>רמת קושי:</strong> ${question.difficultyLevel}</p>
                <p><strong>זמן מענה:</strong> ${formatDuration(question.responseTimeSeconds)}</p>
                <p><strong>תשובה שנבחרה:</strong> ${question.answerChosen}</p>
                <p><strong>האם צדק?</strong> ${question.isAnswerCorrect ? 'כן' : 'לא'}</p>            
                <p><strong>תשובה נכונה:</strong> ${question.correctAnswer}</p>            
                <p><strong>הסבר:</strong> ${question.explanation}</p>
            </div>
        
        
    `;
        }
        container.innerHTML += questionCard;
        counter++;  // העלאה של המונה ב-1 עבור כל שאלה
    }); 

}

//document.getElementById('save-pdf-btn').addEventListener('click', function () {
//    // תופס את האלמנט שברצונך להמיר ל-PDF
//    const element = document.querySelector('.container');

//    // יצירת תאריך נוכחי בפורמט YYYY-MM-DD
//    const today = new Date();
//    const formattedDate = today.toISOString().slice(0, 10); // מחזיר YYYY-MM-DD

//    // יצירת שם קובץ עם התאריך
//    const fileName = `test-summary-${formattedDate}.pdf`;

//    // המרת האלמנט ל-PDF ושמירתו כ-Blob
//    html2pdf()
//        .from(element)
//        .set({
//            margin: 1, // ניתן להתאים את השוליים לפי הצורך
//            filename: fileName, // שם הקובץ, כולל התאריך
//            html2canvas: { scale: 2 }, // סקייל גבוה יותר כדי לשפר את איכות התמונה
//            jsPDF: {
//                unit: 'pt',
//                format: 'a4',
//                orientation: 'portrait',
//                fontStyle: 'normal',
//                fontName: 'Arial' // ודאי שאת משתמשת בפונט שתומך בעברית
//            }
//        })
//        .output('blob')  // מחזיר את ה-PDF כ-Blob
//        .then(function (blob) {
//            // יצירת אובייקט FormData להכיל את קובץ ה-PDF
//            const formData = new FormData();
//            formData.append('pdf', blob, fileName);

//            // הגדרת URL של ה-API לשמירת ה-PDF
//            const pdfApiUrl = `${localHostAPI}api/Tests/save-pdf`;

//            // שליחת ה-PDF לשרת בעזרת AJAX
//            fetch(pdfApiUrl, {
//                method: 'POST',
//                body: formData
//            })
//                .then(response => {
//                    if (!response.ok) {
//                        throw new Error('Network response was not ok');
//                    }
//                    alert('PDF נשמר בהצלחה בשרת');
//                })
//                .catch(error => {
//                    console.error('Error:', error);
//                    alert('Failed to save PDF on server.');
//                });
//        });
//});

//function saveHtmlSummary(testId, userId) {
//    const element = document.querySelector('.container');

//    // יצירת תאריך נוכחי בפורמט YYYY-MM-DD
//    const today = new Date();
//    const formattedDate = today.toISOString().slice(0, 10); // מחזיר YYYY-MM-DD

//    // יצירת שם קובץ עם התאריך
//    const fileName = `test-summary-${userId}-${testId}-${formattedDate}.html`;

//    // קבלת התוכן של ה-HTML
//    const htmlContent = element.innerHTML;

//    // יצירת אובייקט FormData להכיל את קובץ ה-HTML
//    const formData = new FormData();
//    formData.append('userId', userId);        // הוספת userId ל-FormData
//    formData.append('testId', testId);        // הוספת testId ל-FormData
//    formData.append('htmlContent', htmlContent);
//    formData.append('fileName', fileName);

//    // הגדרת URL של ה-API לשמירת ה-HTML
//    const apiUrl = `${localHostAPI}api/Tests/save-html-summary`;

//    // שליחת ה-HTML לשרת בעזרת AJAX
//    fetch(apiUrl, {
//        method: 'POST',
//        body: formData
//    })
//        .then(response => {
//            if (!response.ok) {
//                throw new Error('Network response was not ok');
//            }
//            alert('סיכום המבחן נשמר בהצלחה בשרת');
//        })
//        .catch(error => {
//            console.error('Error:', error);
//            alert('Failed to save test summary on server.');
//        });
//}

