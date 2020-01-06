var questionsEl = document.getElementById("questions");
var clock = document.getElementById("time");
var answersEl = document.getElementById("answers");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startBtn = document.getElementById("getStarted");
var currentQuestionIndex = 0;
var time = questions.length * 15;
var clockId;

function getStarted() {
  var startEl = document.getElementById("startScreen");
  startEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");

  clockId = setInterval(clockRun, 1000);

  clock.textContent = time;

  getQuestion();

}
startBtn.onclick = getStarted;



var quizContainer = ('container');
var resultsContainer = document.getElementsByClassName('results');




function getQuestion() {
  var currentQuestion = questions[currentQuestionIndex];
  var titleEl = document.getElementById("questions-title");

  titleEl.textContent = currentQuestion.title;
  answersEl.innerHTML = "";
  currentQuestion.answers.forEach(function (response, i) {

    var answerNode = document.createElement("button");
    answerNode.setAttribute("class", "response");
    answerNode.setAttribute("value", response);
    answerNode.textContent = i + 1 + ". " + response;
    answerNode.onclick = questionClick;
    answersEl.appendChild(answerNode);
  });
}

function questionClick() {
  if (this.value !== questions[currentQuestionIndex].response) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }


    clock.textContent = time;

    sfxWrong.play();

    feedbackEl.textContent = "Wrong!";
  } else {
    feedbackEl.textContent = "Correct!";
  }

  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function () {
    feedbackEl.setAttribute("class", "feedback hide");
  }, 1000);

  // move to next question
  currentQuestionIndex++;

  // check if we've run out of questions
  if (currentQuestionIndex === questions.length) {
    quizEnd();
  } else {
    getQuestion();
  }
}

function quizEnd() {
  // this stops the clock
  clearInterval(clockId);

  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");

  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;

  questionsEl.setAttribute("class", "hide");
}

function clockRun() {
  time--;
  clock.textContent = time;

  if (time <= 0) {
    quizEnd();
  }
}

function saveScore() {
  var initials = initialsEl.value.trim();

  // make sure value wasn't empty
  if (initials !== "") {
    // get saved scores from localstorage, or if not any, set to empty array
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    // format new score object for current user
    var newScore = {
      score: time,
      initials: initials
    };

    // save to localstorage
    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    // redirect to next page
    window.location.href = "scores.html";
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveScore();
  }
}

submitBtn.onclick = saveScore;