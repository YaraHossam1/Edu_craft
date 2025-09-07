const toDark = [
  document.querySelector(".darkmode-button"),
  document.querySelector(".darkmode-button .sun"),
  document.querySelector(".darkmode-button .moon"),
  document.querySelectorAll(".darkmode-button .lines")
];

let c=0;
const darkmodeButton = document.querySelector(".darkmode-button");
darkmodeButton.addEventListener("click", () => {
  for (let i = 0; i < toDark.length - 1; i++) {
    toDark[i].classList.toggle("dark");
    console.log(toDark[i].classList);
  }
  for (let i = 0; i < toDark[3].length; i++) {
    toDark[3][i].classList.toggle("dark");
  }
  if (c == 0) {
    document.getElementById("stylesheetsquiz").href = "../CSS/quiz2.css";
    c++;
}
else {
  document.getElementById("stylesheetsquiz").href = "../CSS/quiz.css";
    c = 0;
}
});

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    answer: 'Paris',
  },
  {
    question: 'What is the largest planet in our solar system?',
    options: ['Mars', 'Saturn', 'Jupiter', 'Neptune'],
    answer: 'Jupiter',
  },
  {
    question: 'Which country won the FIFA World Cup in 2018?',
    options: ['Brazil', 'Germany', 'France', 'Argentina'],
    answer: 'France',
  },
  {
    question: 'What is the tallest mountain in the world?',
    options: ['Mount Everest', 'K2', 'Kangchenjunga', 'Makalu'],
    answer: 'Mount Everest',
  },
  {
    question: 'Which is the largest ocean on Earth?',
    options: [
      'Pacific Ocean',
      'Indian Ocean',
      'Atlantic Ocean',
      'Arctic Ocean',
    ],
    answer: 'Pacific Ocean',
  },
  {
    question: 'What is the chemical symbol for gold?',
    options: ['Au', 'Ag', 'Cu', 'Fe'],
    answer: 'Au',
  },
  {
    question: 'Who painted the Mona Lisa?',
    options: [
      'Pablo Picasso',
      'Vincent van Gogh',
      'Leonardo da Vinci',
      'Michelangelo',
    ],
    answer: 'Leonardo da Vinci',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Mars', 'Venus', 'Mercury', 'Uranus'],
    answer: 'Mars',
  },
  {
    question: 'What is the largest species of shark?',
    options: [
      'Great White Shark',
      'Whale Shark',
      'Tiger Shark',
      'Hammerhead Shark',
    ],
    answer: 'Whale Shark',
  },
  {
    question: 'Which animal is known as the King of the Jungle?',
    options: ['Lion', 'Tiger', 'Elephant', 'Giraffe'],
    answer: 'Lion',
  },
];

const quizContainer = document.getElementById('quiz');
const resultContainer = document.getElementById('result');
const submitButton = document.getElementById('submit');
const retryButton = document.getElementById('retry');
const showAnswerButton = document.getElementById('showAnswer');
const backButton = document.getElementById('backhome');


let currentQuestion = 0;
let score = 0;
let incorrectAnswers = [];



function displayQuestion() {
  const questionData = quizData[currentQuestion];

  const questionElement = document.createElement('div');
  questionElement.className = 'question';
  questionElement.innerHTML = questionData.question;

  const optionsElement = document.createElement('div');
  optionsElement.className = 'options';

  for (let i = 0; i < questionData.options.length; i++) {
    const option = document.createElement('label');
    option.className = 'option';

    const radio = document.createElement('input');
    radio.type = 'radio';
    radio.name = 'quiz';
    radio.className = 'Radio';
    radio.value = questionData.options[i];

    const optionText = document.createTextNode(questionData.options[i]);

    option.appendChild(radio);
    option.appendChild(optionText);
    optionsElement.appendChild(option);
  }

  quizContainer.innerHTML = '';
  quizContainer.appendChild(questionElement);
  quizContainer.appendChild(optionsElement);
}

function checkAnswer() {
  const selectedOption = document.querySelector('input[name="quiz"]:checked');
  if (selectedOption) {
    const answer = selectedOption.value;
    if (answer === quizData[currentQuestion].answer) {
      score++;
    } else {
      incorrectAnswers.push({
        question: quizData[currentQuestion].question,
        incorrectAnswer: answer,
        correctAnswer: quizData[currentQuestion].answer,
      });
    }
    currentQuestion++;
    selectedOption.checked = false;
    if (currentQuestion < quizData.length) {
      displayQuestion();
    } else {
      displayResult();
    }
  }
}

function displayResult() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'inline-block';
  backButton.style.display = 'inline-block';
  resultContainer.innerHTML = `<strong>You scored ${score} out of ${quizData.length}!</strong>`;
}

function retryQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrectAnswers = [];
  quizContainer.style.display = 'block';
  submitButton.style.display = 'inline-block';
  retryButton.style.display = 'none';
  showAnswerButton.style.display = 'none';
  backButton.style.display = 'none';
  resultContainer.innerHTML = '';
  displayQuestion();
}


function showAnswer() {
  quizContainer.style.display = 'none';
  submitButton.style.display = 'none';
  retryButton.style.display = 'inline-block';
  showAnswerButton.style.display = 'none';
  backButton.style.display = 'inline-block';

  let incorrectAnswersHtml = '';
  if (score === 10) {
    incorrectAnswersHtml += `<p class="output"><b>Excellent, your answers are correct!</b></p>`;
    resultContainer.innerHTML = `
    <p><strong>There is no incorrect answers</strong></p>
    ${incorrectAnswersHtml}`;
  } else {
    for (let i = 0; i < incorrectAnswers.length; i++) {
      incorrectAnswersHtml += `
        <p class="output">
          <b>Question: ${incorrectAnswers[i].question}</b><br>
          <span class="wrong">Your Answer:</span> ${incorrectAnswers[i].incorrectAnswer}<br>
          <span class="correct">Correct Answer:</span> ${incorrectAnswers[i].correctAnswer}
        </p>
      `;
    }
    resultContainer.innerHTML = `
    <p><strong>Incorrect Answers:</strong></p>
    ${incorrectAnswersHtml}
  `;
  }
}

submitButton.addEventListener('click', checkAnswer);
retryButton.addEventListener('click', retryQuiz);
showAnswerButton.addEventListener('click', showAnswer);

displayQuestion();
