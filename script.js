var currentQuestionIndex = 0;
var time = 60;
var timerId;

var questionsDiv = document.getElementById("questions");
var timerDiv = document.getElementById("time");
var answersDiv = document.getElementById("answers");
var submitBtn = document.getElementById("submitBtn");
var startBtn = document.getElementById("startBtn");
var initialsDiv = document.getElementById("playerinit");
var feedbackDiv = document.getElementById("feedback");
var highscoresDiv = document.getElementById("highscores");

function startQuiz() {
  var startScreenDiv = document.getElementById("startScreen");
  startScreenDiv.setAttribute("class", "hidden");

  questionsDiv.removeAttribute("class");

  timerId = setInterval(clockTick, 1000);

  timerDiv.textContent = time;

  getQuestion();
}

function getQuestion() {
  var currentQuestion = questionsList[currentQuestionIndex];

  var titleDiv = document.getElementById("questionTitle");
  titleDiv.textContent = currentQuestion.title;

  answersDiv.innerHTML = "";

  currentQuestion.answers.forEach(function(choice, i) {
    var choiceNode = document.createElement("button");
    choiceNode.setAttribute("class", "choice");
    choiceNode.setAttribute("value", choice);

    choiceNode.textContent = i + 1 + ". " + choice;

    choiceNode.onclick = questionClick;

    answersDiv.appendChild(choiceNode);
  });
}

function questionClick() {
  if (this.value !== questionsList[currentQuestionIndex].correctAnswer) {
    time -= 15;

    if (time < 0) {
      time = 0;
    }

    timerDiv.textContent = time;

    feedbackDiv.textContent = "Incorrect";
  } else {

    feedbackDiv.textContent = "Correct";
  }

  feedbackDiv.removeAttribute("class");
  setTimeout(function() {
    feedbackDiv.setAttribute("class", "hidden");
  }, 1000);

  currentQuestionIndex++;

  if (currentQuestionIndex === questionsList.length) {
    endQuiz();
  } else {
    getQuestion();
  }
}

function endQuiz() {
  clearInterval(timerId);

  var endScreenDiv = document.getElementById("endScreen");
  endScreenDiv.removeAttribute("class");

  var finalScore = document.getElementById("finalScore");
  finalScore.textContent = time;

  questionsDiv.setAttribute("class", "hidden");
}

function clockTick() {
  time--;
  timerDiv.textContent = time;

  if (time <= 0) {
    endQuiz();
  }
}

var questionsList = [
    {
        title: "Why is the use of semantic HTML elements valuable?",
        answers: ["They help organize the page", "They improve search engine priority", "Each one has its own distinct use", "All of the Above"],
        correctAnswer: "All of the Above"
    },
    {
        title: "What HTML elements can be targeted by a QuerySelector?",
        answers: ["IDs", "Classes and IDs", "Any Element", "Classes, IDs, and divs"],
        correctAnswer: "Any Element"
    },
    {
        title: "Which of these indicates when a keyboard button is pressed?",
        answers: ["onclick", "onkeyup", "onkeydown", "function()"],
        correctAnswer: "onkeydown"
    },
    {
        title: "How do you change an HTML element with JS?",
        answers: ["Add a script tag below it", "Give it an ID and target it", "Create a variable with the same name", "Stop coding and cry yourself to sleep"],
        correctAnswer: "Give it an ID and target it"
    },
    {
        title: "What unit of time does Javascript act in?",
        answers: ["Milliseconds", "Seconds", "Minutes", "Days"],
        correctAnswer: "Milliseconds"
    },
    {
        title: "What is the objective best color to style your webpages with?",
        answers: ["Gray", "Red", "Chartreuse", "Lavender"],
        correctAnswer: "Chartreuse"
    }
]

function saveHighscore() {
  var initials = initialsDiv.value.trim();

  if (initials !== "") {
    var highscores =
      JSON.parse(window.localStorage.getItem("highscores")) || [];

    var newScore = {
      score: time,
      initials: initials
    };

    highscores.push(newScore);
    window.localStorage.setItem("highscores", JSON.stringify(highscores));

    window.location.href = "highscores.html"
  }
}

function checkForEnter(event) {
  if (event.key === "Enter") {
    saveHighscore();
  }
}


startBtn.onclick = startQuiz;

submitBtn.onclick = saveHighscore;

initialsDiv.onkeyup = checkForEnter;
