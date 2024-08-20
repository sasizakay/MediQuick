let GetQuestionsByTopicAPI = localHostAPI + "api/Questions/topicId/";
const params = new URLSearchParams(window.location.search);
const topicId = params.get("topicId");
const topicName = params.get("topicName");
GetQuestionsByTopicAPI += topicId;
let userConnected = sessionStorage.getItem("id");
GetQuestionsByTopicAPI += `/userId/ ${userConnected}`;
ajaxCall(
  "GET",
  GetQuestionsByTopicAPI,
  "",
  getQuestionsByTopicSCB,
  getQuestionsByTopicECB
);

function OpenCloseEL() {
  //Adding event listeners to handle the logic of questions open and closed display types
  const questionsCollection = document.getElementsByClassName("question");
  const questionsArray = Array.from(questionsCollection);
  questionsArray.forEach((question) => {
    question.addEventListener("click", () => {
      // Close all other divs
      questionsArray.forEach((d) => {
        if (d !== question) {
          d.classList.remove("open");
          d.classList.add("closed");
        }
      });

      // Toggle the clicked div
      if (question.classList.contains("open")) {
        question.classList.remove("open");
        question.classList.add("closed");
      } else {
        question.classList.remove("closed");
        question.classList.add("open");
      }

      //calculate the margin-top for the explanation div to be at the buttom of the question div
      let openDiv = document.getElementsByClassName("open");
      if (openDiv.length) {
        let expDiv = openDiv[0].firstElementChild.lastElementChild;
        const margin = calculateMargin();
        expDiv.style.marginTop = margin + "px";
      }
    });
  });
}

function HeartIconEL() {
  //Adding event listeners to handle the logic of adding a question to favourites
  const heartIconCollection = document.getElementsByClassName("icon");
  const heartIconArray = Array.from(heartIconCollection);
  heartIconArray.forEach((icon) => {
    icon.addEventListener("click", (event) => {
      event.stopPropagation();
      if (icon.classList.contains("fav")) {
        icon.src = "./../images/icons/empty-heart.svg";
        icon.classList.remove("fav");
        //----adding to favourites code will be here----
      } else {
        icon.src = "./../images/icons/full-heart.svg";
        icon.classList.add("fav");
        //----removing from favourites code will be here----
      }
    });
  });
}
function getQuestionsByTopicSCB(questionsList) {
  $("#main-header")[0].innerHTML += topicName;
  document.title += ` ${topicId}`;
  let str = "";
  for (let i = 0; i < questionsList.length; i++) {
    str = `<div class="closed question">
              <div class="question-wrapper">
                  <div class="question-content">
                      <b>${questionsList[i].questionSerialNumber}. 
                        ${questionsList[i].content}</b>
                  </div>
                  <div class="options">
                      <div class="option-1">
                           א. ${questionsList[i].correctAnswer}
                      </div>
                      <div class="option-2">
                           ב. ${questionsList[i].wrongAnswer1}
                      </div>
                      <div class="option-3">
                           ג. ${questionsList[i].wrongAnswer2}
                      </div>
                      <div class="option-4">
                          ד. ${questionsList[i].wrongAnswer3}
                      </div>
                      <br>
                  </div>
                  <div class="explanation">
                      <b><u>הסבר:</u></b> ${questionsList[i].explanation}
                  </div>

              </div>`;
    str += `<div class="icons">`;
    if(questionsList[i].userAnswered != 0) {
      str +=`<img src="./../images/icons/round-v.svg" alt="" srcset="">`
    }
    if (questionsList[i].isFavourite != 0) {
      str += `
              <img class="icon fav"
                src="./../images/icons/full-heart.svg" onclick="toggleFavourite(${questionsList[i].questionSerialNumber})" alt="" srcset="">
    `;
    } else {
      str += `
      
      <img class="icon"
  src="./../images/icons/empty-heart.svg" onclick="toggleFavourite(${questionsList[i].questionSerialNumber})" alt="" srcset="">
  `;
    }
    str += `</div>`;
    str += `</div>`;
    if (i <= questionsList.length / 2 - 0.5) {
      document.getElementsByClassName("col1")[0].innerHTML += str;
    } else {
      document.getElementsByClassName("col2")[0].innerHTML += str;
    }
  }
  OpenCloseEL();
  HeartIconEL();
}

function getQuestionsByTopicECB(err) {
  alert("שגיאה בטעינת השאלות " + err.status);
}

function toggleFavourite(questionId) {
  let toggleFavouritesAPI = localHostAPI + `api/Questions/questionId/${questionId}/userId/${userConnected}`;
  ajaxCall(
    "POST",
    toggleFavouritesAPI,
    "",
    toggleFavouriteSCB,
    toggleFavouriteECB
  );
}

function toggleFavouriteSCB(num) {
  console.log(num);
}

function toggleFavouriteECB(err) {
  alert("הוספת / הסרת השאלה ממועדפים נכשלה " + err.status);
}

function calculateMargin() {
  let contentDiv =
    document.getElementsByClassName("open")[0].firstElementChild.children[0];
  let optionsDiv =
    document.getElementsByClassName("open")[0].firstElementChild.children[1];
  let expDiv =
    document.getElementsByClassName("open")[0].firstElementChild
      .lastElementChild;
  console.log(
    document
      .getElementsByClassName("open")[0]
      .firstElementChild.getBoundingClientRect().height
  );
  let questionDivHieght = 238;
  let contentDivHeight = contentDiv.getBoundingClientRect().height;
  let optionsDivHeight = optionsDiv.getBoundingClientRect().height;
  let expDivHeight = expDiv.getBoundingClientRect().height;

  return questionDivHieght - contentDivHeight - optionsDivHeight - expDivHeight;
}
