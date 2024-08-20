let forumAPI = localHostAPI + "api/Forum";
const params = new URLSearchParams(window.location.search);
const issueId = params.get("issueId");
const topicName = params.get("topicName");
let userConnected = sessionStorage.getItem("id");

let getIssueAPI = (forumAPI += "/issueId/" + issueId); //get issue api
ajaxCall("GET", getIssueAPI, "", issueGetSCB, issueGetECB);

function issueGetSCB(issue) {
  document.title = issue[0].title + " - MediQuick";
  let cont = document.getElementById("container");
  let str = "";
  str += `<div class="go-prev" onclick="GoToPreviousPage(${issue[0].topicid})"><img src="./../images/icons/go-prev-right-arrow.svg" alt=""> חזרה לפורום ${topicName}</div>`;
  if (issue[0].isClosed) {
    str += `<div class="cant-comment" onclick="">הסוגיה נעולה, לא ניתן להגיב</div>`;
  } else {
    str +=`<div class="add-comment" onclick="AddComment()"><img src="./../images/icons/plus-circle.svg" alt=""> הוסף תגובה</div>`;
  }

  //let formattedIssueDateTime = formatDateTime(issue[0].createdAt);
  let formattedIssueDateDite = "";
  let formattedCommentDateTime = "";
  str += `<div class="issue">
                <div class="issue-headers">
                    <div class="create-details">
                        <div class="date-time">${formatDateTime(issue[0].issueCreatedAt).date + " " + formatDateTime(issue[0].issueCreatedAt).time}</div>
                        <div class="creator">${issue[0].issueUserFullName}</div>`
                        if (issue[0].issueCreatorId == userConnected) {
                          str += `<div class="edit-comment"><img title="ערוך סוגיה" src="./../images/icons/edit-pencil.svg" onclick="editIssue()" alt="עריכה"></div>`
                          
                        }
                    str += `</div>
                    <div class="title"><h4>${issue[0].title}</h4></div>
                    <div class="issue-content">${issue[0].issueContent}</div>
                    <div class="num-of-comments">${issue[0].commentCount} תגובות</div>
                </div>
            </div>
            `;
  //render the issue, for loop for the comments
  if (issue[0].commentCount > 0) {
      str += `<h3>תגובות</h3>`;
    for (let i = 0; i < issue.length; i++) {
      if (issue[i].isCommentActive) {
        
          formattedCommentDateTime = formatDateTime(issue[i].commentCreatedAt);
        str += `<div class="comment">
                  <div class="create-details">
                      <div data-number=${issue[i].commentId} class="comment-id">#${i + 1}</div>
                      <div class="date-time">${formattedCommentDateTime.date} ${
          formattedCommentDateTime.time
        }</div>
                      <div class="creator">${issue[i].userFullName}</div>`
                      if (issue[i].commentCreatorId == userConnected) {
                          str += `<div class="edit-comment" onclick="editComment(${issue[i].commentId})"><img title="ערוך תגובה" src="./../images/icons/edit-pencil.svg" alt="עריכה"></div>`
                          str += `<div class="edit-comment" onclick="deleteComment(${issue[i].commentId})"><img title="מחק תגובה" src="./../images/icons/clear-form-24.svg" alt="מחיקה"></div>`
                      }
                  str += `</div>
                  <div class="comment-content">
                      ${issue[i].commentContent}
                  </div>
              </div>`;
      }
      }
  }
  cont.innerHTML = str;
  }

function issueGetECB(err) {
  alert("שגיאה בקריאת הסוגיה" + err.status);
}

function formatDateTime(dateTime) {
  var date = dateTime.split("T")[0];
  var time = dateTime.split("T")[1].split(".")[0];

  var dateParts = date.split("-");
  var formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

  return {
    date: formattedDate,
    time: time,
  };
}

function GoToPreviousPage(topicId) {
  window.location.href = `forum-topic.html?topicId=${topicId}&topicName=${topicName}`;
}

function deleteComment(commemntId) {
    CommentToDelete = {
        commentId: commemntId,
        issueId: issueId,
        content: ""
    }
    apiDeleteComment = localHostAPI + "updateCommentInactive";
    ajaxCall("PATCH", apiDeleteComment, JSON.stringify(CommentToDelete), deleteCommentPostSCB, deleteCommentPostECB);
    return false;
}
function deleteCommentPostSCB(data) {
    alert("התגובה נמחקה בהצלחה");
    ajaxCall("GET", getIssueAPI, "", issueGetSCB, issueGetECB);
}
function deleteCommentPostECB(err) {
    console.log("מחיקת התגובה נכשלה");
}

function editComment(commemntId) {
    //עדכון תגובה
    const modalEditCommentIssue = document.getElementById("editCommentModal");
    const closeEditCommentModalSpan = document.querySelector(".closeEditComment");
    modalEditCommentIssue.style.display = "flex";
    document.getElementById("hiddenCommentId").value = commemntId;
    // סגירת המודאל בעת לחיצה על ה-x
    closeEditCommentModalSpan.onclick = function () {
        modalEditCommentIssue.style.display = "none";
    };

    // סגירת המודאל בעת לחיצה מחוץ למודאל
    window.onclick = function (event) {
        if (event.target == modalEditCommentIssue) {
            modalEditCommentIssue.style.display = "none";
        }
    };
}

function resetFormEditComment() {
    $("#editCommentForm")[0].reset();
}

$("#editCommentModal").submit(function (event) {
    //event.preventDefault();
    editedComment = {
        commentId: $("#hiddenCommentId").val(),
        userId: userConnected,
        issueId: issueId,
        content: $("#editCommentContent").val()
    }
    apiEditComment = localHostAPI + "updateCommentDetails";
    ajaxCall("Patch", apiEditComment, JSON.stringify(editedComment), editCommentPostSCB, editCommentPostECB);
    return false;
});

function editCommentPostSCB(data) {
    alert("התגובה עודכנה בהצלחה");
    document.getElementById("editCommentModal").style.display = "none";
    ajaxCall("GET", getIssueAPI, "", issueGetSCB, issueGetECB);

}

function editCommentPostECB(err) {
    console.log("עדכון תגובה נכשל");
}

function AddComment() {
    //הוספת תגובה
    const modalCommentIssue = document.getElementById("addCommentModal");
    const closeCommentModalSpan = document.querySelector(".closeComment");
    modalCommentIssue.style.display = "flex";
    
    // סגירת המודאל בעת לחיצה על ה-x
    closeCommentModalSpan.onclick = function () {
        modalCommentIssue.style.display = "none";
    };

    // סגירת המודאל בעת לחיצה מחוץ למודאל
    window.onclick = function (event) {
        if (event.target == modalCommentIssue) {
            modalCommentIssue.style.display = "none";
        }
    };
}
function resetFormAddComment() {
    $("#addCommentForm")[0].reset();
}

$("#addCommentForm").submit(function (event) {
    //event.preventDefault();
    newComment = {
        userId: userConnected,
        issueId: issueId,
        content: $("#commentContent").val()
    }
    apiAddComment = localHostAPI + "InsertComment";
    ajaxCall("Post", apiAddComment, JSON.stringify(newComment), AddCommentPostSCB, AddCommentPostECB);
    return false;
});

function AddCommentPostSCB(data) {
    alert("התגובה נוספה בהצלחה");
    document.getElementById("addCommentModal").style.display = "none";
    ajaxCall("GET", getIssueAPI, "", issueGetSCB, issueGetECB);

}

function AddCommentPostECB(err) {
    console.log("הוספת תגובה נכשלה");
}

function editIssue(){
    //הוספת סוגיה
    const modalEditIssue = document.getElementById("editIssueModal");
    const closeEditModalSpan = document.querySelector(".closeIssue");
    modalEditIssue.style.display = "flex";
    document.querySelector("#issueTitle").placeholder = document.querySelector(".title").textContent;
    document.querySelector("#issueContent").placeholder = document.querySelector(".issue-content").textContent;


    // סגירת המודאל בעת לחיצה על ה-x
    closeEditModalSpan.onclick = function () {
        modalEditIssue.style.display = "none";
    };

    // סגירת המודאל בעת לחיצה מחוץ למודאל
    window.onclick = function (event) {
        if (event.target == modalEditIssue) {
            modalEditIssue.style.display = "none";
        }
    };
}
$("#editIssueForm").submit(function (event) {
    //event.preventDefault();
    editedIssue = {
        userId: userConnected,
        issueId: issueId,
        title: $("#issueTitle").val(),
        content: $("#issueContent").val()
    }
    apiEditIssue = localHostAPI + "updateIssueDetails";
    ajaxCall("PATCH", apiEditIssue, JSON.stringify(editedIssue), EditIssuePostSCB, EditIssuePostECB);
    return false;
});

function EditIssuePostSCB(data) {
    alert("הסוגיה עודכנה בהצלחה!");
    document.getElementById("editIssueModal").style.display = "none";
    ajaxCall("GET", getIssueAPI, "", issueGetSCB, issueGetECB);

}

function EditIssuePostECB(err) {
    console.log("עדכון הסוגיה נכשל");
}
function resetFormIssue() {
    $("#editIssueForm")[0].reset();
}