let forumAPI = localHostAPI + "api/Forum";
const params = new URLSearchParams(window.location.search);
const topicId = params.get("topicId");
const topicName = params.get("topicName");
let userConnected = sessionStorage.getItem("id");
document.title += " " + topicName;
document.getElementById("main-header").innerHTML += " " + topicName;
let getIssuesAPI = forumAPI + "/topicid/" + topicId;
ajaxCall("GET", getIssuesAPI, "", issuesGetSCB, issuesGetECB);

function issuesGetSCB(issuesList) {
    let cont = document.getElementById("container");
    let str = "";
    str += `<div class="go-prev" onclick="GoToPreviousPage()"><img src="./../images/icons/go-prev-right-arrow.svg" alt=""> חזרה לכל הפורומים </div>`;
    str +=`<div class="add-issue" onclick="AddIssue()"><img src="./../images/icons/plus-circle.svg" alt=""> הוסף סוגיה</div>`;
    for (var i = 0; i < issuesList.length; i++) {
        let issueClass = issuesList[i].isClosed ? 'issue close locked' : 'issue close unlocked';
        let formattedDateTime = formatDateTime(issuesList[i].createdAt)
      str += `<div id="issue-${issuesList[i].issueId}" class="${issueClass}" data-userId="${issuesList[i].userId}">
                <div class="issue-headers">
                    <div class="create-details">
                        <div class="date-time">${formattedDateTime.date} ${formattedDateTime.time}</div>
                        <div class="creator">${issuesList[i].userFullName}</div>`
                        //if userid = userid
                        if (issuesList[i].userId == userConnected) {
                            if (issuesList[i].isClosed) {
                                //סוגיה נעולה, הקש לפתיחה
                                str += `<div class="lock-issue-toggle" onclick="ToggleOpenLockIssue(${issuesList[i].issueId})"><img title="הסוגיה נעולה, לחץ להסרת הנעילה" src="./../images/icons/lock-on.svg" alt="סוגיה נעולה" srcset=""></div>`

                            } else {
                                //סוגיה פתוחה, הקש לנעילה
                                str += `<div class="lock-issue-toggle" onclick="ToggleOpenLockIssue(${issuesList[i].issueId})"><img title="הסוגיה פתוחה, לחץ לנעילה" src="./../images/icons/lock-off.svg" alt="סוגיה פתוחה" srcset=""></div>`

                            }
                        } else {
                            if (issuesList[i].isClosed) {
                                //סוגיה נעולה
                                str += `<div class="lock-issue-toggle" onclick="ToggleOpenLockIssue(${issuesList[i].issueId})"><img title="הסוגיה נעולה" src="./../images/icons/lock-on.svg" alt="סוגיה נעולה" srcset=""></div>`

                            } else {
                                //סוגיה פתוחה
                                str += `<div class="lock-issue-toggle" onclick="ToggleOpenLockIssue(${issuesList[i].issueId})"><img title="הסוגיה פתוחה" src="./../images/icons/lock-off.svg" alt="סוגיה פתוחה" srcset=""></div>`

                            }
                        }

                        
                    str += `</div>
                    <div class="title" onclick="GoToIssuePage(${issuesList[i].issueId})"><h4>${issuesList[i].title}</h4></div>
                    <div class="issue-content">${issuesList[i].issueContent}</div>
                    <div class="num-of-comments">${issuesList[i].commentCount} תגובות</div>
                </div>
                <div class="expand">
                    <img class="expand-icon" title="הצג את תוכן הסוגיה" src="./../images/icons/plus-circle.svg" alt="הצג עוד" onclick="ToggleOpenCloseIssue(this)">
                </div>
            </div>`
    }
    cont.innerHTML = str;
    console.log(issuesList)
}
function issuesGetECB(err) {
    alert("קריאת הסוגיה נכשלה" + err.status);
}

function ToggleOpenCloseIssue(item) {
    let issueDiv = item.parentElement.parentElement;
    if (issueDiv.classList.contains('close')) {
        issueDiv.classList.remove('close');
        issueDiv.classList.add('open');
        item.src = './../images/icons/minus-circle-1.5thick.svg'
        item.title = "הסתר את תוכן הסוגיה"
    } else {
        issueDiv.classList.remove('open');
        issueDiv.classList.add('close');
        item.src = './../images/icons/plus-circle.svg'
        item.title = "הצג את תוכן הסוגיה"
    }
}

function GoToIssuePage(issueId) {
    console.log(issueId);
    window.location.href = `forum-issue.html?issueId=${issueId}&topicName=${topicName}`
}

function formatDateTime(dateTime) {
    var date = dateTime.split('T')[0];
    var time = dateTime.split('T')[1].split('.')[0];

    var dateParts = date.split('-');
    var formattedDate = `${dateParts[2]}.${dateParts[1]}.${dateParts[0]}`;

    return {
        date: formattedDate,
        time: time
    };
}

function GoToPreviousPage() {
    window.location.href = `forum.html`;
}

function AddIssue() {
    //הוספת סוגיה
    const modal = document.getElementById("AddIssueModal");
    const closeModalSpan = document.querySelector(".closeIssue");
    modal.style.display = "flex";

    // סגירת המודאל בעת לחיצה על ה-x
    closeModalSpan.onclick = function () {
        modal.style.display = "none";
    };

    // סגירת המודאל בעת לחיצה מחוץ למודאל
    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    };
} 

$("#AddIssueModal").submit(function (event) {
    newIssue = {
        topicId:topicId,
        userId:userConnected,
        title: $("#issueTitle").val(),
        content: $("#issueContent").val()
    }
    apiInsertIssue = localHostAPI + "InsertIssue";
    ajaxCall("Post", apiInsertIssue, JSON.stringify(newIssue), InsertIssuePostSCB, InsertIssuePostECB);
    return false;
});
    
function InsertIssuePostSCB(data) {
    alert("הסוגיה נוספה בהצלחה!");
    document.getElementById("AddIssueModal").style.display = "none";
    ajaxCall("GET", getIssuesAPI, "", issuesGetSCB, issuesGetECB);

}
function InsertIssuePostECB(err) {
    console.log("הכנסת סוגיה נכשלה");
}
function resetFormIssue() {
    $("#AddIssueForm")[0].reset();
}
function ToggleOpenLockIssue(issueId) {
    let issueToggleStatusAPI = localHostAPI +"toggleIssueStatus";
    const issueDivCreator = document.getElementById(`issue-${issueId}`).dataset.userid;

    if (issueDivCreator == userConnected) {
        
        ajaxCall("PATCH", issueToggleStatusAPI,JSON.stringify(issueId), ToggleIssueStatusSCB, ToggleIssueStatusECB);   
    }
}

function ToggleIssueStatusSCB(obj) {
    const issueDiv = document.getElementById(`issue-${obj.issueId}`)
    const lockIcon = document.querySelector(`#issue-${obj.issueId} img`);
    if (obj.isClosed) {
        issueDiv.classList.remove("unlocked")
        issueDiv.classList.add("locked")
        lockIcon.src = `./../images/icons/lock-on.svg`
        lockIcon.title = `הסוגיה נעולה, לחץ להסרת הנעילה`
    } else {
        issueDiv.classList.remove("locked")
        issueDiv.classList.add("unlocked")
        lockIcon.src = `./../images/icons/lock-off.svg`
        lockIcon.title = `הסוגיה פתוחה, לחץ לנעילה`
    }
}

function ToggleIssueStatusECB(err) {
    alert("הפעולה נכשלה")
}