let numberOfQuestion = 0;
let yourScore = 0;

//generate question html
function populateQuestion() {
  if (numberOfQuestion <= answerBank.length - 1) {
    return `<div class="questionForm">
        <h2></h2>
        <form class="submitNow">
          <fieldset>
          <legend class="questionsAndAnswers">${answerBank[numberOfQuestion].question}</legend>
            <label class="answerBackground">
              <input type="radio" name="answers" value="${
								answerBank[numberOfQuestion].answers[0]
							}" required>
              <span class="answers">${
								answerBank[numberOfQuestion].answers[0]
							}</span>
            </label>
            <label class="answerBackground">
              <input type="radio" name="answers" value="${
								answerBank[numberOfQuestion].answers[1]
							}" required>
              <span class="answers">${
								answerBank[numberOfQuestion].answers[1]
							}</span>
            </label>
            <label class="answerBackground">
              <input type="radio" name="answers" value="${
								answerBank[numberOfQuestion].answers[2]
							}" required>
              <span class="answers">${
								answerBank[numberOfQuestion].answers[2]
							}</span>
            </label>
            <label class="answerBackground">
              <input type="radio" name="answers" value="${
								answerBank[numberOfQuestion].answers[3]
							}" required>
              <span class="answers">${
								answerBank[numberOfQuestion].answers[3]
							}</span>
            </label>
            <button onClick="pickAnswer()" type="submit" class="questionButton">Submit</button>
        </fieldset>
        </form>
      </div>`;
  } else {
    renderResults();
    restartQuiz();
    $('.currentQuestion').text(10);
  }
}

//change question Number
function changeQuestionNumber() {
  numberOfQuestion++;
  $('.currentQuestion').text(numberOfQuestion + 1);
}

//change yourScore
function changeYourScore() {
  yourScore++;
}

function beginQuiz() {
  $('.startOfQuiz').on('click', '.quizStartButton', function (event) {
    $('.startOfQuiz').remove();
    $('.questionsForm').css('display', 'block');
    $('.currentQuestion').text(1);
    createQuestion();
  });
}

// render question in DOM
function createQuestion() {
  $('.questionsForm').html(populateQuestion());
}

//user selects answer on submit run user feedback
function pickAnswer() {
  $('form').on('submit', function (event) {
    event.preventDefault();
    let pickedAnswer = $('input:checked');
    let currentAnswer = pickedAnswer.val();
    let rightAnswer = `${answerBank[numberOfQuestion].rightAnswer}`;
    if (currentAnswer === rightAnswer) {
      pickedAnswer.parent().addClass('correct');
      ifRightAnswer();
    } else {
      pickedAnswer.parent().addClass('wrong');
      ifWrongAnswer();
    }
  });
}

function ifRightAnswer() {
  correctAnswer();
  addToYourScore();
}

function ifWrongAnswer() {
  wrongAnswer();
}

//user feedback for correct answer
function correctAnswer() {
  let rightAnswer = `${answerBank[numberOfQuestion].rightAnswer}`;
  $('.questionsForm').html(
    `<div class="answerForm questionForm"><div class="icon"><img src="http://assets1.ignimgs.com/2017/09/08/deadpool-1504831592157_1280w.jpg" alt="Approving Deadpool"/><img src="${
			answerBank[numberOfQuestion].icon
		}" alt="${
			answerBank[numberOfQuestion].alt
		}"/></div><p><b>Impressive!  You know your stuff!</b></p><button type=button class="nextButton questionButton">Next</button></div>`
  );
}

//user feedback for wrong answer
function wrongAnswer() {
  let rightAnswer = `${answerBank[numberOfQuestion].rightAnswer}`;
  $('.questionsForm').html(
    `<div class="answerForm questionForm"><div class="icon"><img src="https://www.unilad.co.uk/wp-content/uploads/2018/03/Deadpool-web-thumb.jpg" alt="DisApproving Deadpool"/><img src="${
			answerBank[numberOfQuestion].icon
		}" alt="${
			answerBank[numberOfQuestion].alt
		}"/></div><p><b>You need to freshen up on your comics!</b><br>The correct answer is <span>"${rightAnswer}"</span></p><button type=button class="nextButton questionButton">Next</button></div>`
  );
}

//update score text
function addToYourScore() {
  changeYourScore();
  $('.yourScore').text(yourScore);
}

//when quiz is over this is the html for the page
function renderResults() {
  if (yourScore == 10) {
    $('.questionsForm').html(
      `<div class="results answerForm questionForm"><img src="https://nostalgiaking.com/wp-content/uploads/2018/02/deadpool-2.jpg" alt="Deadpool animated icon"/><p>You got ${yourScore} / 10</p><p>PERFECTION!!!!</p><button class="restartButton questionButton">Restart Quiz</button></div>`
    );
  } else if (yourScore < 10 && yourScore >= 8) {
    $('.questionsForm').html(
      `<div class="results answerForm questionForm"><img src="http://assets1.ignimgs.com/2017/09/08/deadpool-1504831592157_1280w.jpg" alt="Deadpool animated icon"/><p>You got ${yourScore} / 10</p><p>You really know your stuff but always continue to read more comics!</p><button class="restartButton questionButton">Restart Quiz</button></div>`
    );
  } else if (yourScore < 8 && yourScore >= 5) {
    $('.questionsForm').html(
      `<div class="results answerForm questionForm"><h3>Close but no cigar</h3><img src="http://assets1.ignimgs.com/2018/05/16/deadpool2-thumb2-1526510546529_1280w.jpg" alt="Deadpool"/><p>You got ${yourScore} / 10</p><p>Almost but you need to read more comics if you want to call your self a comic know it all!</p><button class="restartButton">Restart Quiz</button></div>`
    );
  } else {
    $('.questionsForm').html(
      `<div class="results answerForm questionForm"><h3>You haven't even watched the movies</h3><img src="https://www.unilad.co.uk/wp-content/uploads/2018/03/Deadpool-web-thumb.jpg" alt="car animcated icon"/><p>You got ${yourScore} / 10</p><p>You should probably start watching some of the movies if you want to stay up on the times!</p><button class="restartButton">Restart Quiz</button></div>`
    );
  }
}

//next question Button
function renderNextQuestion() {
  $('main').on('click', '.nextButton', function (event) {
    changeQuestionNumber();
    createQuestion();
  });
}

//restart quiz
function restartQuiz() {
  $('main').on('click', '.restartButton', function (event) {
    location.reload();
  });
}

//run quiz functions
function startTheQuiz() {
  beginQuiz();
  pickAnswer();
  renderNextQuestion();
}

$(startTheQuiz);