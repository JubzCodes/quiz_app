/* eslint-disable no-undef */
const quizForm = document.getElementById("quizForm");
const submitQuizButton = document.getElementById("submitQuiz");
const answerElement = document.getElementById("answer");
const resultSection = document.getElementById("resultSection");
// const resultCaption = document.getElementById("resultCaption");

const wrongAnswer = "Wrong answer :(";
const correctAnswer = "Correct answer :)";

const submitQuizHandler = async () => {
  const splitURL = window.location.href.split('/')
  const quizID = splitURL[splitURL.length - 1]
  const { data } = await axios.get(`http://localhost:8080/quiz/answers/${quizID}`);
  const givenAnswer = answerElement.value;
  const isCorrect = data.answer === givenAnswer;

  // hide form & show result
  quizForm.classList.add("hidden");
  resultSection.classList.remove("hidden");
  //Store response information
  const created = await axios.post("http://localhost:8080/results", {
    quiz_id: parseInt(quizID),
    result: isCorrect,
    name: 'test',
    request_url: "test"
  })
  if (created.data.success) {
    window.location.href = `/results/${created.data.id}`
  }

  //   // show result
  //   if (isCorrect) {
  //     resultCaption.innerText = correctAnswer;
  //   } else {
  //     resultCaption.innerText = wrongAnswer;
  //   }
};

// event listeners
submitQuizButton.onclick = submitQuizHandler;
