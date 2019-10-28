
var questions = [
  {
    title: "What year was the Apple iphone released?:",
    choices: ["2007", "2006", "2008", "2009"],
    answer: "2007"
  },
  {
    title: "How many iterations of iphones have there been?",
    choices: ["14", "15", "11", "12"],
    answer: "14"
  },
  {
    title: "One of these is not a major competitor to Apple, which?",
    choices: ["Samsung", "Microsoft", "Google", "Nike"],
    answer: "Nike"
  },
  {
    title: "Which major feature was updated to the newest iphone?",
    choices: ["Camera", "The size", "Operating System", "The Charger"],
    answer: "Camera"
  },
  {
    title: "Which of these name is a co founders of Apple inc",
    choices: ["Steve Wozniak", "Jeff Bezos", "Paul Allen", "square brackets"],
    answer: "Steve Wozniak"
  }
];

$("#start").click(function getGoing(){
  var x = document.getElementsByClassName("start");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
})


var quizContainer = $('container');
var resultsContainer = document.getElementsByClassName('results');




function displayQA(){
  for (let i = 0; i < questions.length; i++) {
    answers = [];

    function answerButtons() {
      for (var i = 0; i < questions.length; i++) {
         var button = document.createElement("button");
         var t = document.createTextNode(questions.choices[i]);
         button.appendChild(t);
         $("#answer").appendChild(button);
      }
    }
    
  }

}

