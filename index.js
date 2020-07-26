//question database
const STORE = [
  {
    question: 'How old is the universe in years?',
    answers: [
      '13.8 billion years-old.',
      '2 billion years-old.',
      '68 million years-old.',
      '900 billion years-old.'
    ],
    correctAnswer:
      '13.8 billion years-old.'
  },
  {
    question:
      'How many planets are in the Solar System?',
    answers: [
      '1 Planet.',
      '16 Planets.',
      '8 Planets.',
      '9 Planets.'
    ],
    correctAnswer:
      '8 Planets.'
  },
  {
    question:
      'What is the smallest planet in our solar system?',
    answers: [
      'Earth.',
      'Mercury.',
      'Pluto.',
      'Venus.'
    ],
    correctAnswer: 'Mercury.'
  },
  {
    question: 'What entity boasts a gravitational pull so powerful even light cannot escape?',
    answers: [
      'Asteroid.',
      'Pulsar.',
      'Solar Wind.',
      'A black hole.'
    ],
    correctAnswer: 'A black hole.'
  },
  {
    question:
      'What percent of the solar system’s mass does Sun holds?',
    answers: [
      '72.6%',
      '21.9%',
      '99.8%',
      '50%'
    ],
    correctAnswer:
      '99.8%'
  },
  {
    question: 'How long does it take for the Sun`s rays to reach earth?',
    answers: [
      '8 minutes.',
      '2 days.',
      '45 seconds.',
      '17 hours. '
    ],
    correctAnswer: '8 minutes.'
  },
  {
    question:
      'When was the first man made object sent into space?',
    answers: [
      '1955. ',
      '1957. ',
      '1962. ',
      '1965. '
    ],
    correctAnswer:
      '1957. '
  },
  {
    question: 'Which direction does the Earth spin?',
    answers: [
      'East to West. ',
      'North to South. ',
      'South to North.',
      'West to East.'
    ],
    correctAnswer:
      'West to East.'
  },
  {
    question: 'In which year was the first exoplanet (51 Pegasi b) discovered?',
    answers: [
      '1995',
      '1997',
      '1987',
      '1985'
    ],
    correctAnswer: '1995'
  },
  {
    question:
      'Which year did the Spirit and Opportunity rovers land on Mars?',
    answers: [
      '1999',
      '2004',
      '2001',
      '2003'
    ],
    correctAnswer: '2004'
  }
];

//variables to store the quiz score and question number information
let score = 0;
let questionNumber = 0;

//template to generate each question
function generateQuestion() {
  if (questionNumber < STORE.length) {
    return createThing(questionNumber);
  } else {
    $('.questionBox').hide();
    finalScore();
    $('.questionNumber').text(10);
  }
}

//increments the number value of the "score" variable by one
//and updates the "score" number text in the quiz view
function updateScore() {
  score++;
  $('.score').text(score);
}

//increments the number value of the "question number" variable by one
//and updates the "question number" text in the quiz view
function updateQuestionNumber() {
  questionNumber++;
  $('.questionNumber').text(questionNumber + 1);
}

//resets the text value of the "question number" and "score" variables
//and updates their repective text in the quiz view
function resetStats() {
  score = 0;
  questionNumber = 0;
  $('.score').text(0);
  $('.questionNumber').text(0);
}

//begins the quiz
function startQuiz() {
  $('.altBox').hide();
  $('.startQuiz').on('click', '.startButton', function (event) {
    $('.startQuiz').hide();
    $('.questionNumber').text(1);
    $('.questionBox').show();
    $('.questionBox').prepend(generateQuestion());
  });
}

//submits a selected answer and checks it against the correct answer
//runs answer functions accordingly
function submitAnswer() {
  $('.spaceBox').on('submit', function (event) {
    event.preventDefault();
    $('.altBox').hide();
    $('.response').show();
    let selected = $('input:checked');
    let answer = selected.val();
    let correct = STORE[questionNumber].correctAnswer;
    if (answer === correct) {
      correctAnswer();
    } else {
      wrongAnswer();
    }
  });
}

//creates html for question form
function createThing(questionIndex) {
  let formMaker = $(`<form>
    <fieldset>
      <legend class="questionText">${STORE[questionIndex].question}</legend>
    </fieldset>
  </form>`)

  let fieldSelector = $(formMaker).find('fieldset');

  STORE[questionIndex].answers.forEach(function (answerValue, answerIndex) {
    $(`<label class="sizeMe" for="${answerIndex}">
        <input class="radio" type="radio" id="${answerIndex}" value="${answerValue}" name="answer" required>
        <span>${answerValue}</span>
      </label>
      `).appendTo(fieldSelector);
  });
  $(`<button type="submit" class="submitButton button"> Submit</button > `).appendTo(fieldSelector);
  return formMaker;
}

//resulting feedback if a selected answer is correct
//increments user score by one
function correctAnswer() {
  $('.response').html(
    `<h3>Your answer is correct!</h3>
    <img src="images/correct.jpg" alt="rocket launch" class="images" width="200px">
      <p class="sizeMe">Success! 780 million lives saved!</p>
      <button type="button" class="nextButton button">Next</button>`
  );
  updateScore();
}

//resulting feedback if a selected answer is incorrect
function wrongAnswer() {
  $('.response').html(
    `<h3>That's the wrong answer...</h3>
    <img src="images/wrong.jpeg" alt="dissapointed monkey face" class="images" width="200px">
    <p class="sizeMe">It's actually:</p>
    <p class="sizeMe">${STORE[questionNumber].correctAnswer}</p>
    <button type="button" class="nextButton button">Next</button>`
  );
}

//generates the next question
function nextQuestion() {
  $('.spaceBox').on('click', '.nextButton', function (event) {
    $('.altBox').hide();
    $('.questionBox').show();
    updateQuestionNumber();
    $('.questionBox form').replaceWith(generateQuestion());
  });
}

//determines final score and feedback at the end of the quiz
function finalScore() {
  $('.final').show();

  const great = [
    'Magnificent!' ,
    'images/win.jpg',
    'You saved everyone on Earth!',
    'You saved everyone on Earth!'
  ];

  const good = [
    'Good, not great.',
    'images/war.jpg',
    'fighting aliens',
    'The battle with aliens continue...'
  ];

  const bad = [
    'It was a good day for aliens....',
    'images/end.jpg',
    'alienWin',
    'A bad day for the Human race...'
  ];

  if (score >= 8) {
    array = great;
  } else if (score < 8 && score >= 3) {
    array = good;
  } else {
    array = bad;
  }
  return $('.final').html(
    `<h3>${array[0]}</h3>
      <img src="${array[1]}" alt="${array[2]}" class="images">
        <h3>Your score is ${score} / 10</h3>
        <p class="sizeMe"> ${array[3]}</p>
        <button type="submit" class="restartButton button">Restart</button>`
  );
}

//takes user back to the starting view to restart the quiz
function restartQuiz() {
  $('.spaceBox').on('click', '.restartButton', function (event) {
    event.preventDefault();
    resetStats();
    $('.altBox').hide();
    $('.startQuiz').show();
  });
}

//runs the functions
function makeQuiz() {
  startQuiz();
  generateQuestion();
  submitAnswer();
  nextQuestion();
  restartQuiz();
}

$(makeQuiz);
