var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var answersEl = document.getElementById("answers");
var submitBtn = document.getElementById("submit");
var initialsEl = document.getElementById("initials");
var feedbackEl = document.getElementById("feedback");
var startBtn = document.getElementById("getStarted");

function getStarted() {
  var startEl = document.getElementById("startScreen");
  startEl.setAttribute("class", "hide");

  questionsEl.removeAttribute("class");
  
  timerId = setInterval(clockTick, 1000);

  timerEl.textContent = time;
  
  getQuestion();

}
startBtn.onclick = getStarted;



var quizContainer = ('container');
var resultsContainer = document.getElementsByClassName('results');




function getQuestion() {
  // get current question object from array
  var currentQuestion = questions[currentQuestionIndex];

  // update title with current question
  var titleEl = document.getElementById("question-title");
  titleEl.textContent = currentQuestion.title;

  // clear out any old question answers
  answersEl.innerHTML = "";
  
  // loop over answers
  currentQuestion.answers.forEach(function(answer, i) {
    // create new button for each answer
    var answerNode = document.createElement("button");
    answerNode.setAttribute("class", "answer");
    answerNode.setAttribute("value", answer);

    answerNode.textContent = i + 1 + ". " + answer;
    
    // attach click event listener to each answer
    answerNode.onclick = questionClick;

    // display on the page
    answersEl.appendChild(answerNode);
  });
}

function questionClick() {
  // check if user guessed wrong
  if (this.value !== questions[currentQuestionIndex].answer) {
    // penalize time
    time -= 15;
    
    if (time < 0) {
      time = 0;
    }

    // display new time on page
    timerEl.textContent = time;

    // play "wrong" sound effect
    sfxWrong.play();

    feedbackEl.textContent = "Wrong!";
  } else {
    // play "right" sound effect
    sfxRight.play();

    feedbackEl.textContent = "Correct!";
  }
  
  // flash right/wrong feedback on page for half a second
  feedbackEl.setAttribute("class", "feedback");
  setTimeout(function() {
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
  // stop timer
  clearInterval(timerId);
  
  // show end screen
  var endScreenEl = document.getElementById("end-screen");
  endScreenEl.removeAttribute("class");
  
  // show final score
  var finalScoreEl = document.getElementById("final-score");
  finalScoreEl.textContent = time;
  
  // hide questions section
  questionsEl.setAttribute("class", "hide");
}

function clockTick() {
  // update time
  time--;
  timerEl.textContent = time;

  // check if user ran out of time
  if (time <= 0) {
    quizEnd();
  }
}

function saveHighscore() {
  // get value of input box
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
    window.location.href = "highscores.html";
  }
}

function checkForEnter(event) {
  // "13" represents the enter key
  if (event.key === "Enter") {
    saveHighscore();
  }
}

// user clicks button to submit initials
submitBtn.onclick = saveHighscore;

var questions = [
  {
    title: "What year was the Apple iphone released?:",
    answers: ["2007", "2006", "2008", "2009"],
    answer: "2007"
  },
  {
    title: "How many iterations of iphones have there been?",
    answers: ["14", "15", "11", "12"],
    answer: "14"
  },
  {
    title: "One of these is not a major competitor to Apple, which?",
    answers: ["Samsung", "Microsoft", "Google", "Nike"],
    answer: "Nike"
  },
  {
    title: "Which major feature was updated to the newest iphone?",
    answers: ["Camera", "The size", "Operating System", "The Charger"],
    answer: "Camera"
  },
  {
    title: "Which of these name is a co founders of Apple inc",
    answers: ["Steve Wozniak", "Jeff Bezos", "Paul Allen", "square brackets"],
    answer: "Steve Wozniak"
  }
];