const searchInput = document.getElementById("searchbar")
const quizListElement = document.getElementById("quizList")
const filteredQuizList = document.getElementById("filteredQuizList")


let quizList = [];
let filteredQuiz = [];

searchInput.addEventListener('keyup', async function (event) {
  console.log(searchInput.value)
  const searchValue = searchInput.value;
  if (searchValue) {
    quizListElement.classList.add("hidden");
    filteredQuizList.classList.remove("hidden")
  } else {
    quizListElement.classList.remove("hidden")
    filteredQuizList.classList.add("hidden")
  }


  filteredQuiz = quizList.filter(quiz => quiz.category.includes(searchValue))
  console.log(filteredQuiz)
  let quizListContent = filteredQuiz.map(quiz => `
  <div>
    <h3> ${quiz.question}</h3>
    <div>
      <div>${quiz.category}</div>
      <div>${moment(quiz.date).format("yyyy-MM-DD hh:mm:ss")}</div>
    </div>
  </div>
`)
  filteredQuizList.innerHTML = quizListContent
  if (filteredQuiz.length === 0) {
    filteredQuizList.innerHTML = "<h3> Nothing matches your query </h3>"
  }
})

const initialize = function (data) {
  quizList = JSON.parse(data)
}
