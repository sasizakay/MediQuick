let topicApi = localHostAPI + "api/Topics";
let userConnected = sessionStorage.getItem("id");
topicApi += "/UserID/" + userConnected;
ajaxCall("GET", topicApi, "", getUserProgressSCB, getUserProgressECB);

function AddProgressPercentage() {
  const circles = document.querySelectorAll(".percentage-circle");

  circles.forEach((circle) => {
    const percentage = circle.getAttribute("data-percentage");
    const progress = circle.querySelector(".circle-progress");
    const offset = 251.2 - (251.2 * percentage) / 100;
    progress.style.strokeDashoffset = offset;
  });
}

function getUserProgressSCB(objectList) {
  str = "";
  for (let i = 0; i < objectList.length; i++) {
    str += `<div class="card" onclick="goToQBTPage(${objectList[i].topicId +", '"+ objectList[i].topicName}')">
    <div class="title">${objectList[i].topicName}</div>
    <div class="percentage-circle" data-percentage="${objectList[i].answeredRatio}">
        <svg viewBox="0 0 100 100">
            <circle class="circle-bg" cx="50" cy="50" r="40"></circle>
            <circle class="circle-progress" cx="50" cy="50" r="40"></circle>
        </svg>
    </div>
</div>`;
  }
  document.getElementById("cards-container").innerHTML = str;
  AddProgressPercentage();
}

function getUserProgressECB(err) {
    alert("טעינת העמוד נכשלה " + err.status);
}

function goToQBTPage(topicId, topicName) {
  window.location.href = `questions-by-topic.html?topicId=${topicId}&topicName=${topicName}`
}

function LogOut() {
  window.location.href = `login.html`;
  sessionStorage.clear();
}