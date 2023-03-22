const form = document.querySelector("form");
const main = document.querySelector("main");

form.addEventListener("submit", (event) => {
  event.preventDefault();

  fetch("https://opentdb.com/api.php?amount=10")
    .then((response) => response.json())
    .then((json) => {
      main.innerHTML = "";
      json.results.forEach((result) => displayResult(result));
    })
    .catch((error) => {
      console.log(error);
    });
});

function displayResult(result) {
  const { category, question, correct_answer } = result;

  const card = document.createElement("article");
  card.classList.add("card");

  const categoryElement = document.createElement("h2");
  categoryElement.textContent = category;

  const questionElement = document.createElement("p");
  questionElement.innerHTML = question;

  const button = document.createElement("button");
  button.textContent = "Show Answer";

  const answerElement = document.createElement("p");
  answerElement.classList.add("hidden");
  answerElement.innerHTML = correct_answer;

  button.addEventListener("click", () => {
    answerElement.classList.toggle("hidden");
  });

  card.append(categoryElement, questionElement, button, answerElement);
  main.append(card);
}
